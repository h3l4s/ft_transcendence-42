import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { UserStatusDto } from './user.dto';

@WebSocketGateway({ namespace: '/user', cors: { origin: '*' }, pingTimeout: 100 })
export class UserGateway implements OnGatewayInit
{
	@WebSocketServer() wss: Server;

	private logger: Logger = new Logger('UserGateway');
	private db: UserStatusDto[] = [];

	afterInit(server: any)
	{
		this.logger.log("server up", server);
	}

	handleConnection(client: Socket)
	{
		client.on('newConnection', () =>
		{
			console.log("[STATUS] new client: " + client.id);
			this.wss.emit('newConnection', { userId: client.id });
		})
	}

	handleDisconnect(client: Socket)
	{
		console.log("[STATUS] client disconnected: " + client.id);

		for (let i = 0; i < this.db.length; i++)
		{
			if (this.db[i].clientId === client.id)
			{
				this.db.splice(i, 1);
				break;
			}
		}

		this.wss.emit('disconnect', { userId: client.id });
	}

	@SubscribeMessage('updateStatus')
	handleUpdateStatus(client: Socket, status: UserStatusDto)
	{
		console.log("[STATUS] update status", status.id, status.status);

		let index = -1;
		for (let i = 0; i < this.db.length; i++)
		{
			if (this.db[i].id === status.id)
			{
				index = i;
				break;
			}
		}
		if (index === -1)
		{
			status.clientId = client.id;
			this.db.push(status);
		}
		else
			this.db[index] = status;

		this.wss.emit('receivedStatus', status);
	}

	@SubscribeMessage('getStatus')
	handleGetStatus(client: Socket, status: UserStatusDto)
	{
		console.log("[STATUS] get status", status.id);

		let index = -1;
		for (let i = 0; i < this.db.length; i++)
		{
			if (this.db[i].id === status.id)
			{
				index = i;
				break;
			}
		}
		if (index === -1)
			client.emit('isStatus', { id: status.id, status: 'offline' });
		else
			client.emit('isStatus', { id: status.id, status: this.db[index].status });
	}

	@SubscribeMessage('challenge')
	handleChallenge(client: Socket, status: UserStatusDto)
	{
		console.log("[STATUS] challenge", status.id);
	}
}
