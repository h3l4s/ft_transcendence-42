import { IoAdapter } from "@nestjs/platform-socket.io";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Console } from "console";
import { checkPrime } from "crypto";
import { Server, Socket } from 'socket.io';
//import i_map from '../../../frontend/src/interface/map.interface'

let player = 0;
let clientNb_simple = 0;
let clientNb_hard = 100;
let clientNb_tennis = 50;
let clientNb_challenge = 500;
let joueur_simple = [];
let joueur_hard = [];
let joueur_tennis = [];
let bdd_game = [];
let match: string;
let current_match = [];
let challenge = [];

interface i_game
{
	player: {
		y: number;
	};
	computer: {
		y: number;
	};
	ball: {
		x: number;
		y: number;
		r: number;
		speed: {
			x: number;
			y: number;
		}
	},
	score: {
		p1_temp: number;
		p2_temp: number;
		p1: number;
		p2: number;
		ball_start: boolean;
	}
	sendPing: boolean;
}

function Move_player(game: any, mouseLocation: number, PLAYER_HEIGHT: number, canvas_height: number, who: number)
{
	// Get the mouse location in the canvas

	if (who === 1)
	{
		if (mouseLocation < PLAYER_HEIGHT / 2)
			game.player.y = 0;
		else if (mouseLocation > canvas_height - PLAYER_HEIGHT / 2)
			game.player.y = canvas_height - PLAYER_HEIGHT;
		else
			game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
	}
	else
	{
		if (mouseLocation < PLAYER_HEIGHT / 2)
			game.computer.y = 0;
		else if (mouseLocation > canvas_height - PLAYER_HEIGHT / 2)
			game.computer.y = canvas_height - PLAYER_HEIGHT;
		else
			game.computer.y = mouseLocation - PLAYER_HEIGHT / 2;
	}
	return (game);
}

function Move_ball(game: i_game, PLAYER_WIDTH: number, canvas_height: number, canvas_width: number, PLAYER_HEIGHT: number, type: string)
{
	// Rebounds on top and bottom
	if (game.ball.y > canvas_height || game.ball.y < 0)
		game.ball.speed.y *= -1;
	if (game.ball.x + 5 > canvas_width - PLAYER_WIDTH)
	{
		game = collision(game.computer, game, canvas_height, canvas_width, PLAYER_HEIGHT, type);
	}
	else if (game.ball.x - 5 < PLAYER_WIDTH)
	{
		game = collision(game.player, game, canvas_height, canvas_width, PLAYER_HEIGHT, type);
	}
	game.ball.x += game.ball.speed.x;
	game.ball.y += game.ball.speed.y;
	return (game);
}

function collision(player: any, game: i_game, canvas_height: number, canvas_width: number, PLAYER_HEIGHT: number, type: string)
{
	// The player does not hit the ball
	if (game.ball.y < player.y || game.ball.y > player.y + PLAYER_HEIGHT)
	{
		// Set ball and players to the center
		if (game.ball.x > canvas_width - 10)
		{
			game.score.ball_start = false;
			game.score.p1++
			game.sendPing = true;
		}
		else
		{
			game.score.ball_start = true;
			game.score.p2++
			game.sendPing = true;
		}
		game.ball.x = canvas_width / 2;
		game.ball.y = canvas_height / 2;
		game.player.y = canvas_height / 2 - PLAYER_HEIGHT / 2;
		game.computer.y = canvas_height / 2 - PLAYER_HEIGHT / 2;

		// Reset speed

		if (!game.score.ball_start)
			game.ball.speed.x = -0.5;
		else
			game.ball.speed.x = 0.7;
		game.ball.speed.y = 0.7;
		return (game);
	}
	else
	{
		// Increase speed and change direction
		game.ball.speed.x *= (type === "hard" ? -1.4 : -1.05);
		game = Angle_Direction(player.y, game, PLAYER_HEIGHT);
	}
	return (game);
}

function Angle_Direction(playerPosition: any, game: i_game, PLAYER_HEIGHT: number,)
{
	var impact = game.ball.y - playerPosition - PLAYER_HEIGHT / 2;
	var ratio = 100 / (PLAYER_HEIGHT / 2);
	// Get a value between 0 and 10
	game.ball.speed.y = Math.round(impact * ratio / 25);
	return (game);
}

@WebSocketGateway({ namespace: '/pong', cors: { origin: '*' } })
export class Matchmaking implements OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer()
	server: Server;

	private bdd = [];

	//connexion
	handleConnection(client: Socket)
	{
		console.log('D Client connected', client.id);
		client.on('newPlayer', (type) =>
		{
			player++;
			if (type === "simple")
			{
				clientNb_simple++;
				client.join(Math.round(clientNb_simple / 2).toString());
				client.emit('serverToRoom', Math.round(clientNb_simple / 2).toString());
				client.on('joinRoom', (clientRoom, nameP1, canvas_size) =>
				{
					if (nameP1 !== joueur_simple[0] && joueur_simple[1] === undefined)
					{
						joueur_simple.push(nameP1);
						this.bdd.push(clientRoom, nameP1, client.id);
						console.table(this.bdd);
					}
					if (clientNb_simple % 2 === 0)
					{
						this.server.to(clientRoom).emit('switchFromServer', joueur_simple);
						if (joueur_simple[0] !== undefined && joueur_simple[1] !== undefined)
							match = joueur_simple[0].toString() + " vs " + joueur_simple[1].toString() + " salon " + clientRoom.toString() + " simple";
						current_match.push(match);
						this.server.to(clientRoom).emit('start', match);
						this.server.to("0").emit('new-match', current_match);
						joueur_simple.pop();
						joueur_simple.pop();
						match = "";
						bdd_game.push(clientRoom, type, "start");
					}
				});
			}
			if (type === "hard")
			{
				clientNb_hard++;
				client.join(Math.round(clientNb_hard / 2).toString());
				client.emit('serverToRoom', Math.round(clientNb_hard / 2).toString());
				client.on('joinRoom', (clientRoom, nameP1) =>
				{
					if (nameP1 !== joueur_hard[0] && joueur_hard[1] === undefined)
					{
						joueur_hard.push(nameP1);
						this.bdd.push(clientRoom, nameP1, client.id);
					}
					if (clientNb_hard % 2 === 0)
					{
						this.server.to(clientRoom).emit('switchFromServer', joueur_hard);
						if (joueur_hard[0] !== undefined && joueur_hard[1] !== undefined)
							match = joueur_hard[0].toString() + " vs " + joueur_hard[1].toString() + " salon " + clientRoom.toString() + " hard";
						current_match.push(match);
						this.server.to(clientRoom).emit('start', match);
						joueur_hard.pop();
						joueur_hard.pop();
						match = "";
						bdd_game.push(clientRoom, type, "start");
					}
				});
			}
			if (type === "tennis")
			{
				clientNb_tennis++;
				client.join(Math.round(clientNb_tennis / 2).toString());
				client.emit('serverToRoom', Math.round(clientNb_tennis / 2).toString());
				client.on('joinRoom', (clientRoom, nameP1) =>
				{
					if (nameP1 !== joueur_tennis[0] && joueur_tennis[1] === undefined)
					{
						joueur_tennis.push(nameP1);
						this.bdd.push(clientRoom, nameP1, client.id);
					}
					if (clientNb_tennis % 2 === 0)
					{
						this.server.to(clientRoom).emit('switchFromServer', joueur_tennis);
						if (joueur_tennis[0] !== undefined && joueur_tennis[1] !== undefined)
							match = joueur_tennis[0].toString() + " vs " + joueur_tennis[1].toString() + " salon " + clientRoom.toString() + " tennis";
						current_match.push(match);
						this.server.to(clientRoom).emit('start', match);
						joueur_tennis.pop();
						joueur_tennis.pop();
						match = "";
						bdd_game.push(clientRoom);
					}
				});
			}
		})
		client.on('play', (game, PLAYER_WIDTH, canvas_height, canvas_width, PLAYER_HEIGHT, type, clientRoom) =>
		{
			game = Move_ball(game, PLAYER_WIDTH, canvas_height, canvas_width, PLAYER_HEIGHT, type);
			if (game.sendPing)
				this.server.to(clientRoom).emit('ping', game);
			this.server.to(clientRoom).emit('returnPlay', game);

		});
		client.on('movePlayer', (info, mouseLocation, game, canvas_height) =>
		{
			game = Move_player(game, mouseLocation, info.player.height, canvas_height, info.who.player);
			this.server.to(info.clientRoom.name).emit('move-player-draw', game);

		});
		client.on('viewer', (clientRoom) =>
		{
			client.join(clientRoom.toString());
			this.server.to(clientRoom.toString()).emit('start-stream');
		});
		client.on('want_gamelive', (room) =>
		{
			client.join(room.toString());
			for (let i = 0; i < current_match.length; i++)
			{
				this.server.to(room.toString()).emit('live', current_match[i]);
			}
		});
		client.on('finish', (clientRoom, data_match) =>
		{
			console.table(current_match);
			console.log("data = ", data_match);
			let pos = current_match.indexOf(data_match.toString());
			console.log("pos = ", pos);
			if (pos !== -1)
				current_match.splice(pos, 1);
			console.table(current_match);
			this.server.to("0").emit('finish-match', current_match);
		});
		client.on('challengeMatch', (clientRoom) =>
		{
			let count = 0;
			challenge.push(clientRoom);
			client.join(clientRoom);
			for (var i = 0; i < challenge.length; i++)
			{
				if (challenge[i] === clientRoom)
					count++;
			}
			if (count !== 0 && count % 2 === 0)
				this.server.to(clientRoom).emit('startChallenge');
		});
	}

	handleDisconnect(client: Socket)
	{
		console.log("[PONG] client disconnected", client.id);
		console.table(this.bdd);

		let pos = this.bdd.indexOf(client.id);
		let restart_room = bdd_game.indexOf(this.bdd[pos - 2]);

		console.log(`client disconnected : ${this.bdd[pos - 2]}`);
		console.log(`status of the room : ${restart_room}`);

		if (restart_room === -1)
		{
			if (this.bdd[pos - 2] < 25)
			{
				clientNb_simple--;
				joueur_simple.pop();
			}
			else if (this.bdd[pos - 2] < 50)
			{
				clientNb_tennis--;
				joueur_tennis.pop();
			}
			else if (this.bdd[pos - 2] < 150)
			{
				clientNb_hard--;
				joueur_hard.pop();
			}
			return;
		}

		this.server.to(this.bdd[pos - 2]).emit('disconnection', this.bdd[pos - 1]);
		player--;
	}
}
