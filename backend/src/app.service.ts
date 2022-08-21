import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	
	getHello(): string {
		//create a default user with a pid of 1
		//this.UserService.tmpCreateUser({ name: "default" })
		return JSON.stringify("Hello World from Backend!");
	}
}
