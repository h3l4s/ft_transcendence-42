import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MsgDto } from './chan.dto';

@WebSocketGateway({ namespace: '/chat', cors: true })
export class ChatGateway implements OnGatewayInit
{
	@WebSocketServer() wss: Server;

	private logger: Logger = new Logger('ChatGateway');

	afterInit(server: any)
	{
		this.logger.log("server up", server);
	}

	@SubscribeMessage('chatToServer')
	handleMessage(client: Socket, message: MsgDto)
	{
		this.wss.to(message.chanId).emit('chatToClient', message);
	}

	@SubscribeMessage('joinRoom')
	handleRoomJoin(client: Socket, room: string)
	{
		client.join(room);
		client.emit('joinedRoom', room);
	}

	@SubscribeMessage('leaveRoom')
	handleRoomLeave(client: Socket, room: string)
	{
		client.leave(room);
		client.emit('leftRoom', room);
	}

}
