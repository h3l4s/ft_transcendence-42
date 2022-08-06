import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

import i_user from 'src/interface/user.interface';

@Injectable()
export class UserService
{
	@InjectRepository(User)
	private readonly repository: Repository<User>;

	public getUser(id: number): Promise<User>
	{
		return this.repository.findOne(id);
	}

	public getUserByName(name: string): Promise<User>
	{
		return this.repository.findOne({ name: name });
	}

	public getUsers(): Promise<User[]>
	{
		return this.repository.find();
	}

	public createUser(body: CreateUserDto): Promise<User>
	{
		const user: User = new User();

		user.access_token = body.access_token;

		return this.repository.save(user);
	}

	public tmpCreateUser(user: i_user): Promise<User>
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
		if (user.elo)
			new_user.elo = user.elo;

		return this.repository.save(new_user);
	}

	public async updateUser(id: number, updateUserDto: UpdateUserDto)
	{
		const user = await this.repository.findOne(id);

		if (updateUserDto.name)
			user.name = updateUserDto.name;
		if (updateUserDto.xp)
			user.xp += updateUserDto.xp;
		user.xp++;
		if (updateUserDto.elo)
			user.elo += updateUserDto.elo;
		if (updateUserDto.win)
			user.win += 1;
		if (updateUserDto.lose)
			user.lose += 1;
		if (updateUserDto.matchHistory)
		{
			if (!user.matchHistory)
				user.matchHistory = [];
			user.matchHistory.push(updateUserDto.matchHistory);
		}
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

		return await this.repository.save(user);
	}

	public deleteUser(id: number)
	{
		return this.repository.delete(id)
	}
}
