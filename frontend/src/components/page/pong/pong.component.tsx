import { useState } from 'react';

import './../../../style/pong.css';

import i_map from '../../../interface/map.interface';

import { ReactComponent as Back } from '../../../icon/left-svgrepo-com.svg'

function Pong(props: { map: i_map, goBack: () => void })
{
	const [inGame, setInGame] = useState(false);
	let canvas = document.getElementById('canvas')! as HTMLCanvasElement;
	let game: any;
	let scoreP1 = 0;
	let scoreP2 = 0;
	let ball_start = 0;
	const PLAYER_HEIGHT = 100;
	const PLAYER_WIDTH = 5;

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
		play();
	}


	function play()
	{
		draw();
		Move_ball();
		requestAnimationFrame(play);
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

	window.addEventListener("load", function ()
	{

		canvas.style.display = "block";
		canvas.style.margin = "auto";
		canvas.width = window.innerWidth / 2;
		canvas.height = window.innerHeight / 2.5;
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
		draw();

		canvas.addEventListener('mousemove', Move_player);

		function draw()
		{
			console.log("gildas le bg");
			var context = canvas.getContext('2d')!;
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
					scoreP1++;
				}
				else
				{
					ball_start = 1;
					scoreP2++;
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
			}
			else
			{
				// Increase speed and change direction
				game.ball.speed.x *= -1.25;
				Angle_Direction(player.y);
			}
		}

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
	});

	return (
		<div>
			<div className='pong--header'>
				<button className='btn--back'
					onClick={() => props.goBack()}>
					<Back />
				</button>
				<h1>Pong</h1>
				<button className='btn--back' style={{ visibility: "hidden" }}>
					<Back />
				</button>
			</div>
			<br />
			[DEBUG] map chosen: {props.map.type}
			<p className='pong--player'>{props.map.p1} vs {props.map.p2}</p>
			{
				!inGame &&
				<div style={{ display: "flex", justifyContent: "center" }}>
					<button id="play-pong" className='pong--btn--play' onClick={launchGame}>
						play
					</button>
					<br />
				</div>
			}
			<canvas id="canvas" ></canvas>
			{inGame && <p id="score">{scoreP1}-{scoreP2}</p>}
		</div >
	);
}

export default Pong;