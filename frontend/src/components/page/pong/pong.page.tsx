import { useState, useContext, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'

import './../../../style/pong.css';
import Pong from './pong.component';
import PongView from './pong.view';
import { io } from 'socket.io-client';
import { ApiUrlContext } from '../../../context/apiUrl.context';

function Matches(props: { matches: string[] })
{
	let ret: JSX.Element[] = [];

	const filteredArray = props.matches.filter(function (ele, pos)
	{
		return props.matches.indexOf(ele) == pos;
	})



	for (let i = 0; i < filteredArray.length; i++)
	{ ret.push(<MatchBtn key={i} match={filteredArray[i]} />); }

	return (
		<div>
			{ret}
		</div>
	);
}

function MatchBtn(props: { match: string })
{
	const [goToView, setGoToView] = useState(false);

	if (goToView)
	{
		return <Navigate to={"/view/" + props.match} />;
	}
	return (
		<div>
			<button className='card card--border card--btn' style={{ marginLeft: "4px" }} onClick={() =>
			{
				console.log("BECIH");
				setGoToView(true);
			}}>
				<span className='span--card--user truncate'>{props.match}</span>
			</button>
		</div >
	);
}

function PongPage()
{
	const { apiUrl } = useContext(ApiUrlContext);
	const [map, setMap] = useState<'simple' | 'hard' | 'tennis' | null>(null);
	const [gameLive, setGameLive] = useState<string[]>([]);

	const socket = io(apiUrl + '/pong');
	let i = 0;

	useEffect(() =>
	{
		let room = "0";
		socket.emit('want_gamelive', room);
		socket.on('live', data =>
		{
			setGameLive(current => [...current, data.toString()]);
		});
		socket.on('new-match', (data: []) =>
		{
			setGameLive(data);

		});
		socket.on('finish-match', (data: []) =>
		{
			setGameLive(data);
		});
		// socket.on('end-viewer', () => {
		// 	setGameLive(current => [...current, data.toString()]);
		// });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// might not store the type of map
	return (
		<div className='pong'>
			{!map ? (
				<div>
					<div className=/*'card card--border*/'menu' /* should probably be a card */>
						<div className=/*'card card--border*/'choice' /* should probably be a card */>
							<div id="select" className='card card--border'>
								<p id="select-css">Select Mode</p>
								<button className='card--border' onClick={() => { setMap('simple') }}>
									Easy Mode Pong
								</button>
								<button className='card--border' onClick={() => { setMap('hard') }}>
									Hard Mode Pong
								</button>
								<button className='card--border' onClick={() => { setMap('tennis') }}>
									Tennis Twisted Pong
								</button>
							</div>
						</div>
						<div className=/*'card card--border*/'choice2' /* should probably be a card */>
							<p id="live-game-msg">Live Game</p>
							<Matches matches={gameLive} />
						</div>
					</div>
				</div>
			) : (
				<Navigate to={'/pong/' + map} />
			)}
		</div>
	);
}

export default PongPage;