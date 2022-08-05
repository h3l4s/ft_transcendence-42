import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import axios from 'axios';

@Controller('user')
export class UserController
{
	@Inject(UserService)
	private readonly service: UserService;

	@Get()
	public getUsers(): Promise<User[]>
	{
		return this.service.getUsers();
	}

	@Get(':id')
	public getUser(@Param('id', ParseIntPipe) id: number): Promise<User>
	{
		return this.service.getUser(id);
	}

	//@Post()
	//public createUser(@Body() body: CreateUserDto): Promise<User> {
	//  return this.service.createUser(body);
	//}

	@Post()
	public async getToken(@Body() data: any)
	{
		console.log(data.token);
		const response: any = await axios.post("https://api.intra.42.fr/oauth/token", {
			client_id: "cbd1064bd58ef5065a103fbd35e3b251f506b89d0f101660714907581d0c9bd9",
			//client_id: "d99b55c8716eb674d3a78116832e8a2bb2085c6706e5195a4f91f66a3739939b",
			client_secret: "CLIENT_SECRET",
			grant_type: "authorization_code",
			code: data.token,
			redirect_uri: "http://localhost:3001/login"
		})
			.catch(error => console.log(error))
		console.log(response.data.access_token);
		return this.service.createUser(response.data);
	}

	// tmp add user
	@Post('name/:name')
	public tmpCreateUser(@Param('name') name: string)
	{
		return this.service.tmpCreateUser({ name: name });
	}

	@Get('name/:name')
	public tmpGetUser(@Param('name') name: string)
	{
		return this.service.getUserByName(name);
	}

	@Put(':id')
	public updateUser(@Param('id') id: number, @Body() data: any)
	{
		return this.service.updateUser(id, data.updateUserDto);
	}
}
