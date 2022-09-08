import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Auth42Dto, ChooseUsernameDto, UpdateUserDto, UpdateUsersAfterGameDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('user')
export class UserController
{
	@Inject(UserService)
	private readonly service: UserService;

	@Get('init')
	public initChan(): Promise<User>
	{
		return this.service.initUser();
	}

	@Get()
	public getUsers(): Promise<User[]>
	{
		return this.service.getUsers();
	}

	@Get('all')
	public getUsersWithDefault(): Promise<User[]>
	{
		return this.service.getUsersWithDefault();
	}

	@Get(':id')
	public getUser(@Param('id', ParseIntPipe) id: number): Promise<User>
	{
		return this.service.getUser(id);
	}

	@Get('auth42')
	public auth42(@Body() data: Auth42Dto): Promise<User>
	{
		return this.service.auth42(data);
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
	public updateUser(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto)
	{
		return this.service.updateUser(id, data);
	}

	@Put('username/:id')
	public chooseUsername(@Param('id', ParseIntPipe) id: number, @Body() data: ChooseUsernameDto, @Res({ passthrough: true }) res: Response)
	{
		return this.service.chooseUsername(id, data.username, res);
	}

	@Post('match')
	public updateUsersAfterGame(@Body() data: UpdateUsersAfterGameDto)
	{
		return this.service.updateUsersAfterGame(data);
	}

	@Put('pp/:id')
	@UseInterceptors(FileInterceptor('file'))
	public async uploadFile(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Body() data: any)
	{
		console.log(id);
		console.log(file);
		console.log(file.originalname);
		console.log(data);
		console.log("finish");

		return await this.service.putPP(id, file.originalname, file.buffer);
	}
}
