import { HttpException, HttpStatus, Injectable, Module } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChanDto, MsgDto, PwdDto } from './chan.dto';
import { Chan } from './chan.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';

function hashing(pwd: string)
{
	let hash = 0;
	for (let i = 0; i < pwd.length; i++)
	{
		const char = pwd.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return (hash);
}

@Injectable()
export class ChanService
{
	@InjectRepository(Chan)
	private readonly repository: Repository<Chan>;

	@InjectRepository(User)
	private readonly repo: Repository<User>;
	static repository: any;

	/*@InjectRepository(User)
	private readonly repository_user: Repository<User>;
	static repository_user: any;*/

	public initChan(): Promise<Chan>
	{
		return this.repository.save({
			id: 1,
			name: "global",
			ownerId: -1,
			adminsId: [-1],
			usersId: [-1],
			type: 'public',
			msg: [],
			bannedId: [],
			mutedId: []
		});
	}

	public getChan(id: number): Promise<Chan>
	{
		return this.repository.findOne(id);
	}

	public getChanByName(name: string): Promise<Chan>
	{
		return this.repository.findOne({ name: name });
	}

	public getChans(): Promise<Chan[]>
	{
		return this.repository.find();
	}

	public async createChan(body: CreateChanDto): Promise<Chan>
	{
		if (await this.repository.count({ where: { name: body.name } }))
			throw new HttpException('channel name conflict', HttpStatus.CONFLICT);

		const chan: Chan = new Chan();

		chan.name = body.name;
		chan.ownerId = body.ownerId;
		chan.adminsId = [];
		chan.adminsId.push(body.ownerId);
		chan.usersId = [];
		if (body.usersId)
			chan.usersId = body.usersId;
		else
			chan.usersId.push(body.ownerId);
		chan.type = body.type;
		chan.msg = [];

		if (body.type === 'protected' && body.hash)
			chan.hash = hashing(body.hash);
		// init msg
		chan.bannedId = [];
		chan.mutedId = [];

		return await this.repository.save(chan);
	}

	/*public async updateChan(id: number, updateChanDto: UpdateChanDto)
	{
		const chan = await this.repository.findOne(id);

		console.log

		if (updateChanDto.name)
			chan.name = updateChanDto.name;
		if (updateChanDto.xp)
			chan.xp += updateChanDto.xp;
		chan.xp++;
		if (updateChanDto.elo)
			chan.elo += updateChanDto.elo;
		if (updateChanDto.win)
			chan.win += 1;
		if (updateChanDto.lose)
			chan.lose += 1;
		if (updateChanDto.matchHistory)
		{
			if (!chan.matchHistory)
				chan.matchHistory = [];
			chan.matchHistory.push(updateChanDto.matchHistory);
		}
		if (updateChanDto.friendId)
		{
			if (!chan.friendsId)
				chan.friendsId = [];
			const i = chan.friendsId.indexOf(updateChanDto.friendId);
			if (i > -1)
				chan.friendsId.splice(i, 1);
			else
				chan.friendsId.push(updateChanDto.friendId);
		}

		return await this.repository.save(chan);
	}*/

	public async sendMsg(id: number, data: MsgDto)
	{
		const chan = await this.repository.findOne(id);

		chan.msg.push(data);

		return this.repository.save(chan);
	}

	public async tryPwd(id: number, data: PwdDto): Promise<Chan>
	{
		const chan = await this.repository.findOne(id);

		if (chan.hash && chan.hash === hashing(data.pwd))
		{
			chan.usersId.push(data.userId);
			return this.repository.save(chan);
		}

		return chan;
	}

	public deleteChan(id: number)
	{
		return this.repository.delete(id)
	}

	public async addUserToChan(id: number, usersId: number)
	{
		const chan = await this.repository.findOne(id);

		if (!chan.usersId)
				chan.usersId = [];
		chan.usersId.push(usersId);
		return this.repository.save(chan);
	}

	public async muteUserForUser(id: number, usersId: number)
	{
		const user = await this.repo.findOne(id);

		if (!user.mutedId)
				user.mutedId = [];		
		user.mutedId.push(usersId);
		return this.repo.save(user);
	}

	public async addAdminToChan(id: number, usersId: number)
	{
		const chan = await this.repository.findOne(id);

		if (!chan.adminsId)
				chan.adminsId = [];
		chan.adminsId.push(usersId);
		return this.repository.save(chan);
	}

	public async addBannedIdToChan(id: number, usersId: number)
	{
		const chan = await this.repository.findOne(id);

		if (!chan.bannedId)
				chan.bannedId = [];
		chan.bannedId.push(usersId);
		return this.repository.save(chan);
	}

	public async addMutedIdToChan(id: number, usersId: number)
	{
		const chan = await this.repository.findOne(id);

		if (!chan.mutedId)
				chan.mutedId = [];
		chan.mutedId.push(usersId);
		return this.repository.save(chan);
	}

	public async quitChan(id: number, usersId: number)
	{
		const chan = await this.repository.findOne(id);
		const index_users = chan.usersId.indexOf(usersId);

		if(index_users > -1)
			chan.usersId.splice(index_users,  1);
		console.log("after usersid splice" + chan.usersId.length);
		console.log("before adminid splice" + chan.adminsId.length);
		if (chan.usersId.length < 1)
		{
			// delete the chan
			return this.repository.remove(chan);
		}
		const index_admins = chan.adminsId.indexOf(usersId);
		if(index_admins > -1)
			chan.adminsId.splice(index_admins,  1);
		console.log("after adminid splice " + chan.adminsId.length + ", index_admins = " + index_admins);
		if (chan.adminsId.length < 1)
		{
			// delete the chan
			return this.repository.remove(chan);
		}

		return this.repository.save(chan);
	}
}
