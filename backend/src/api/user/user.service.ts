import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
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
		return this.repository.findOne({ username: name });
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

		new_user.username = user.name;

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
}
