import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChanDto, UpdateChanDto } from './chan.dto';
import { Chan } from './chan.entity';

@Injectable()
export class ChanService
{
	@InjectRepository(Chan)
	private readonly repository: Repository<Chan>;

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

	public createChan(body: CreateChanDto): Promise<Chan>
	{
		const chan: Chan = new Chan();

		chan.name = body.name; // no check if chan name already exist
		chan.ownerId = body.ownerId;
		chan.adminsId.push(body.ownerId);
		if (body.usersId)
			chan.usersId = body.usersId;
		else
			chan.usersId.push(body.ownerId);
		chan.type = body.type;
		if (body.hash)
			chan.hash = body.hash;

		return this.repository.save(chan);
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

	public deleteChan(id: number)
	{
		return this.repository.delete(id)
	}
}
