import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../user/user.controller';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ChanController } from './chan.controller';
import { Chan } from './chan.entity';
import { ChanService } from './chan.service';
import { ChatGateway } from './chat.gateway';

@Module({
	imports: [TypeOrmModule.forFeature([Chan]), TypeOrmModule.forFeature([User])],
	controllers: [ChanController, UserController],
	providers: [ChanService, ChatGateway, UserService],
})
export class ChanModule { }
