import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Response } from 'express';
import { Readable } from 'stream';
import { Not, Repository } from 'typeorm';
import { Auth42Dto, UpdateUserDto, UpdateUsersAfterGameDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService
{
	@InjectRepository(User)
	private readonly repository: Repository<User>;
	static repository: any;

	public initUser(): Promise<User>
	{
		return this.repository.save({
			id: 1,
			access_token: "none",
			name: "default",
			pp: null,
			pp_name: "",
			xp: -1,
			elo: -1,
			win: -1,
			lose: -1,
			friendsId: [],
			mutedId: [],
			isDeleted: false
		});
	}

	public getUser(id: number): Promise<User>
	{
		return this.repository.findOne({ where: { id: id } });
	}

	public getUserByName(name: string): Promise<User>
	{
		return this.repository.findOne({ where: { name: name } });
	}

	public getUsers(): Promise<User[]>
	{
		return this.repository.find({ where: { id: Not(1) } });
	}

	public getUsersWithDefault(): Promise<User[]>
	{
		return this.repository.find();
	}

	public async auth42(data: Auth42Dto): Promise<User>
	{
		// volontary any cast
		const response: any = await axios.post("https://api.intra.42.fr/oauth/token", {
			client_id: (data.uid ? data.uid : "cbd1064bd58ef5065a103fbd35e3b251f506b89d0f101660714907581d0c9bd9"),
			client_secret: data.secret,
			grant_type: "authorization_code",
			code: data.token,
			redirect_uri: "http://localhost:3001/login"	// might not work to redirect to localhost
		}).catch(error => console.log(error));

		if (!response.data || !response.data.access_token)
			throw new HttpException("Invalid token", HttpStatus.BAD_REQUEST);

		if (await this.repository.count({ where: { access_token: response.data.access_token } }))
			return this.repository.findOne({ where: { access_token: response.data.access_token } });

		const user_info: any = await axios.get("https://api.intra.42.fr/v2/me", {
			headers: { Authorization: "Bearer " + response.data.access_token }
		}).catch(error => console.log(error));

		if (!user_info.data || !user_info.data.login || !user_info.data.image_url)
			throw new HttpException("Invalid user response to 42api", HttpStatus.BAD_REQUEST);

		const new_user: User = new User();

		new_user.access_token = response.data.access_token;
		const c = await this.repository.count({ where: { name: user_info.data.login } })
		if (c)
			new_user.name = "#" + user_info.data.login + "-" + c;
		else
			new_user.name = user_info.data.login;
		new_user.pp_name = user_info.data.image_url;

		return this.repository.save(new_user);
	}

	public tmpCreateUser(user: {
		name: string;
		elo?: number;
		xp?: number;
		win?: number;
		lose?: number;
	}): Promise<User>
	{
		const new_user: User = new User();

		new_user.access_token = "tmp_null";

		new_user.name = user.name;

		// profile pic
		if (user.elo)
			new_user.elo = user.elo;
		if (user.xp)
			new_user.xp = user.xp;
		if (user.win)
			new_user.win = user.win;
		if (user.lose)
			new_user.lose = user.lose;

		return this.repository.save(new_user);
	}

	public async updateUser(id: number, updateUserDto: UpdateUserDto)
	{
		const user = await this.repository.findOne({ where: { id: id } });

		if (updateUserDto.name)
			user.name = updateUserDto.name;
		if (updateUserDto.twofa)
			user.twofa = updateUserDto.twofa;
		if (updateUserDto.xp)
			user.xp += updateUserDto.xp;
		if (updateUserDto.elo)
			user.elo += updateUserDto.elo;
		if (updateUserDto.win)
			user.win += 1;
		if (updateUserDto.lose)
			user.lose += 1;
		if (updateUserDto.friendId)
		{
			if (!user.friendsId)
				user.friendsId = [];
			const i = user.friendsId.indexOf(updateUserDto.friendId);
			if (i > -1)
				user.friendsId.splice(i, 1);
			else
				user.friendsId.push(updateUserDto.friendId);
		}
		if (updateUserDto.mutedId)
		{
			if (!user.mutedId)
				user.mutedId = [];
			const i = user.mutedId.indexOf(updateUserDto.mutedId);
			if (i > -1)
				user.mutedId.splice(i, 1);
			else
				user.mutedId.push(updateUserDto.mutedId);
		}

		return await this.repository.save(user);
	}

	public async chooseUsername(id: number, name: string, res: Response)
	{
		const user = await this.repository.findOne({ where: { id: id } });

		if (await this.repository.count({ where: { name: name } }))
			throw new HttpException("username already taken", HttpStatus.CONFLICT);

		user.name = name;

		return await this.repository.save(user);
	}

	public async updateUsersAfterGame(data: UpdateUsersAfterGameDto)
	{
		const winner: User = await this.repository.findOne({ where: { name: data.winner } });
		const loser: User = await this.repository.findOne({ where: { name: data.loser } });

		winner.win++;
		loser.lose++;

		const K = 42;	// could change it depending on elo:
		// (higher elo, lower number. But usualy only applies over 2000 elo)

		const Sw = data.scoreWinner / (data.scoreWinner + data.scoreLoser);
		const Sl = data.scoreLoser / (data.scoreWinner + data.scoreLoser);
		const Ew = 1 / (1 + Math.pow(10, ((loser.elo - winner.elo) / 400)));
		const El = 1 / (1 + Math.pow(10, ((winner.elo - loser.elo) / 400)));

		winner.elo += Math.ceil(K * (Sw - Ew));
		loser.elo += Math.ceil(K * (Sl - El));

		if (winner.elo > 942)
		{
			winner.xp += data.scoreWinner / 2 * ((winner.elo - 942) / 142) + 1.42;
			loser.xp += data.scoreLoser / 2 * ((loser.elo - 942) / 142);
		}
		else
			winner.xp += 1.42;

		this.repository.save(loser);
		return this.repository.save(winner);
	}

	public deleteUser(id: number)
	{
		return this.repository.delete(id)
	}

	public async getPP(id: number)//: Promise<StreamableFile>
	{
		const user: User = await this.repository.findOne({ where: { id: id } });

		// very unsure about this working

		return new StreamableFile(Readable.from(user.pp));
	}

	public async putPP(id: number, name: string, buffer: Buffer)
	{
		const user: User = await this.repository.findOne({ where: { id: id } });

		user.pp_name = name;
		user.pp = buffer;

		return await this.repository.save(user);
	}
}
