import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import axios from 'axios';
import { userToken } from './userToken.dto';

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;

  //@Get(':id')
  //public getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
  //  return this.service.getUser(id);
  //}

  //@Post()
  //public createUser(@Body() body: CreateUserDto): Promise<User> {
  //  return this.service.createUser(body);
  //}

  @Post()
  public async getToken(@Body() newCode: userToken){
	console.log(newCode.token);
	return ;
	//const b = await axios.post("https://api.intra.42.fr/oauth/token", {
    //  client_id: "cbd1064bd58ef5065a103fbd35e3b251f506b89d0f101660714907581d0c9bd9",
    //  client_secret: "392ba7d509a8473a857728b4b030714ff8016969e241f6fb7eed0b47c58c867c",
    //  grant_type: "authorization_code",
	//  code: newCode.token,
	//  redirect_uri: "http://localhost:3001"
    //});
	//return b;
  }
}
