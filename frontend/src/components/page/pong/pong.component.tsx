import { useEffect, useState } from 'react';

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
		handleCanvas(false, props.map.type);
	}

	useEffect(() =>
	{
		handleCanvas(true, props.map.type);
	});

	return (
		<div className='pong'>
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
			<div style={{ height: "3rem" }}>
				{!inGame &&
					<div style={{ display: "flex", justifyContent: "center" }}>
						<button className='pong--btn--play' onClick={launchGame}>
							<span id="play-pong">play</span>
						</button>
						<br />
					</div>
				}
				<p id="score" style={{ visibility: (inGame ? "visible" : "hidden") }}>
					<span id="scoreP1HTML" />-<span id="scoreP2HTML" />
				</p>
			</div>
			<canvas id="canvas" />
		</div >
	);
}

function handleCanvas(init: boolean, type: 'simple' | 'hard' | 'tennis')
{
	let canvas = document.querySelector("#canvas")! as HTMLCanvasElement;
	canvas.style.display = "block";
	canvas.style.margin = "auto";
	canvas.width = window.innerWidth / 2;
	canvas.height = window.innerHeight / 2.5;
	const PLAYER_HEIGHT = (type === 'hard' ? 50 : 100);
	const PLAYER_WIDTH = 5;

	let game = {
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
	let ball_start = false;
	let scoreP1HTML = document.querySelector("#scoreP1HTML")! as HTMLElement;
	let scoreP2HTML = document.querySelector("#scoreP2HTML")! as HTMLElement;
	let scoreP1 = 0;
	let scoreP2 = 0;

	scoreP1HTML.innerText = "0";
	scoreP2HTML.innerText = "0";

	draw();
	if (init)
		return;

	play();

	canvas.addEventListener('mousemove', Move_player);

	function draw()
	{
		let context = canvas.getContext('2d')!;
		let img = new Image();

		if (type === 'simple' || type === 'hard')
		{
			// Draw field
			context.fillStyle = 'black';
			context.fillRect(0, 0, canvas.width, canvas.height);
			// Draw middle line
			context.strokeStyle = 'white';
			context.beginPath();
			context.moveTo(canvas.width / 2, 0);
			context.lineTo(canvas.width / 2, canvas.height);
			context.stroke();
		}
		else 
		{
			img.src = 'https://us.123rf.com/450wm/sermax55/sermax551811/sermax55181100034/127713212-court-de-tennis-champ-de-couverture-d-herbe-illustration-vectorielle-vue-de-dessus-avec-grille-et-om.jpg?ver=6'
			context.drawImage(img, 0, 0, canvas.width, canvas.height);
		}

		// Draw players
		context.fillStyle = (type === 'hard' ? 'red' : 'white');
		context.fillRect(5, game.player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
		context.fillRect(canvas.width - 5 - PLAYER_WIDTH, game.computer.y, PLAYER_WIDTH, PLAYER_HEIGHT);
		// Draw ball
		context.beginPath();
		context.fillStyle = (type === 'hard' ? 'red' : 'white');
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
		if (scoreP1 === 11 || scoreP2 === 11)
		{
			canvas.style.display = "none";
			return;
		}

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
				ball_start = false;
				scoreP1++
				scoreP1HTML.innerText = scoreP1.toString();
			}
			else
			{
				ball_start = true;
				scoreP2++
				scoreP2HTML.innerText = scoreP2.toString();
			}
			game.ball.x = canvas.width / 2;
			game.ball.y = canvas.height / 2;
			game.player.y = canvas.height / 2 - PLAYER_HEIGHT / 2;
			game.computer.y = canvas.height / 2 - PLAYER_HEIGHT / 2;

			// Reset speed

			if (!ball_start)
				game.ball.speed.x = -2;
			else
				game.ball.speed.x = 2;
		}
		else
		{
			// Increase speed and change direction
			game.ball.speed.x *= (type === 'hard' ? -1.5 : -1.2);
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
}

export default Pong;
