import { useState } from 'react';

import './../../../style/pong.css';

import i_map from '../../../interface/map.interface';

import { ReactComponent as Back } from '../../../icon/left-svgrepo-com.svg'

function Pong(props: { map: i_map, goBack: () => void })
{
	const [inGame, setInGame] = useState(false);

	if (!inGame)	// should initialize diferently
	{
		props.map.p1 = "player 1";
		props.map.p2 = "player 2";
	}

	function launchGame()
	{
		props.map.p1 = "wassim";
		props.map.p2 = "gildas";
		setInGame(true);
	}

	return (
		<div>
			<button className='btn--back'
				style={{ position: "absolute", top: "calc(1rem + var(--nav-h))", left: "1rem" }}
				onClick={() => props.goBack()}>
				<Back />
			</button>
			<h1 className='pong--header'>Pong</h1>
			<br />
			[DEBUG] map chosen: {props.map.type}
			<p className='pong--player'>{props.map.p1} vs {props.map.p2}</p>
			{!inGame &&
				<div>
					<button id="play-pong" className='pong--btn--play' onClick={launchGame}>
						play
					</button>
					<br />
				</div>}
			<canvas id="canvas" ></canvas>
			{inGame &&
				<p id="score">
					<span id="score-pong" />
					<span id="tiret" />
					<span id="score2-pong" />
				</p>
			}
		</div>
	);
}

window.addEventListener("load", function ()
{
	let canvas: any;
	let game: any;
	let score = this.document.querySelector("#score-pong")! as HTMLElement;
	let score2 = this.document.querySelector("#score2-pong")! as HTMLElement;
	let score1 = 0;
	let scorej2 = 0;
	let ball_start = 0;
	let PLAYER_HEIGHT = 100;
	let PLAYER_WIDTH = 5;
	let click = document.querySelector("#play-pong")! as HTMLElement;
	let tiret = document.querySelector("#tiret")! as HTMLElement;

	console.log("in");	// doesn't seems to load the event

	//score2.style.marginLeft = "69%";
	/*click.style.textAlign = "center";
	click.style.marginLeft = "46%";
	click.style.marginBottom = "48%";
	click.style.fontSize = "205%";
	click.style.fontFamily = "OCR A Std";*/

	function draw()
	{
		console.log("gildas le bg");
		var context = canvas.getContext('2d');
		// Draw field
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);
		// Draw middle line
		context.strokeStyle = 'white';
		context.beginPath();
		context.moveTo(canvas.width / 2, 0);
		context.lineTo(canvas.width / 2, canvas.height);
		context.stroke();
		// Draw players
		context.fillStyle = 'white';
		context.fillRect(5, game.player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
		context.fillRect(canvas.width - 5 - PLAYER_WIDTH, game.computer.y, PLAYER_WIDTH, PLAYER_HEIGHT);
		// Draw ball
		context.beginPath();
		context.fillStyle = 'white';
		context.arc(game.ball.x, game.ball.y, game.ball.r, 0, Math.PI * 2, false);
		context.fill();
	}

	function Move_ball()
	{
		// Rebounds on top and bottom
		if (game.ball.y > canvas.height || game.ball.y < 0)
			game.ball.speed.y *= -1;
		if (game.ball.x + 5 > canvas.width - PLAYER_WIDTH)
		{
			collision(game.computer, game);
		}
		else if (game.ball.x - 5 < PLAYER_WIDTH)
		{
			collision(game.player, game);
		}
		game.ball.x += game.ball.speed.x;
		game.ball.y += game.ball.speed.y;
	}

	function play()
	{
		draw();
		Move_ball();
		requestAnimationFrame(play);
	}

	function Angle_Direction(playerPosition: any)
	{
		var impact = game.ball.y - playerPosition - PLAYER_HEIGHT / 2;
		var ratio = 100 / (PLAYER_HEIGHT / 2);
		// Get a value between 0 and 10
		game.ball.speed.y = Math.round(impact * ratio / 10);
	}

	function collision(player: any, game: any)
	{
		// The player does not hit the ball
		if (game.ball.y < player.y || game.ball.y > player.y + PLAYER_HEIGHT)
		{
			// Set ball and players to the center
			if (game.ball.x > 400)
			{
				ball_start = 0;
				score1++;
				score.innerHTML = score1.toString();
			}
			else
			{
				ball_start = 1;
				scorej2++;
				score2.innerHTML = scorej2.toString();
			}
			game.ball.x = canvas.width / 2;
			game.ball.y = canvas.height / 2;
			game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
			game.computer.y = canvas.height / 2 - PLAYER_HEIGHT / 2;

			// Reset speed

			if (ball_start === 0)
				game.ball.speed.x = -2;
			else
				game.ball.speed.x = 2;
		} else
		{
			// Increase speed and change direction
			game.ball.speed.x *= -1.25;
			Angle_Direction(player.y);
		}
	}

	click.innerHTML = "Play";
	canvas = document.getElementById('canvas');
	canvas.style.display = "block";
	canvas.style.margin = "auto";
	canvas.width = this.window.innerWidth / 2;
	canvas.height = this.window.innerHeight / 2;
	game = {
		player: {
			y: canvas.height / 2 - PLAYER_HEIGHT / 2
		},
		computer: {
			y: canvas.height / 2 - PLAYER_HEIGHT / 2
		},
		ball: {
			x: canvas.width / 2,
			y: canvas.height / 2,
			r: 5,
			speed: {
				x: 2,
				y: 2
			}
		}
	};
	canvas.addEventListener('mousemove', Move_player);
	function Move_player(event: any)
	{
		// Get the mouse location in the canvas
		var canvasLocation = canvas.getBoundingClientRect();
		var mouseLocation = event.clientY - canvasLocation.y;
		if (mouseLocation < PLAYER_HEIGHT / 2)
			game.player.y = 0;
		else if (mouseLocation > canvas.height - PLAYER_HEIGHT / 2)
			game.player.y = canvas.height - PLAYER_HEIGHT;
		else
			game.player.y = mouseLocation - PLAYER_HEIGHT / 2;
	}
	draw();
	click.addEventListener('click', function ()
	{
		console.log("clicked");
		click.style.display = "none";
		/*player1.innerHTML = "wassim";
		player2.innerHTML = "gildas";*/
		score.innerHTML = "0";
		score2.innerHTML = "0";
		tiret.innerHTML = "-";
		play();
	});
});

export default Pong;
