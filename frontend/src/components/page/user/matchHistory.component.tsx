import { useState } from "react";

import i_matchHistory from "../../../interface/matchHistory.interface";
import i_user from "../../../interface/user.interface";
import useFetch from "../../../request/useFetch";

import Backdrop from "../../modal/backdrop";
import ProfileModal from "../../modal/profile.modal";
import Error from "../../request_answer_component/error.component";
import Loading from "../../request_answer_component/loading.component";

function get_opponent(username: string, users: i_user[])
{
	for (let i = 0; i < users.length; i++)
		if (users[i].name === username)
			return (users[i]);
	return (users[0]);
}

function MatchHistory(props: { username: string | undefined, users: i_user[] })
{
	const { data, loading, error } = useFetch("http://localhost:3000/pong/match/" + props.username, 'get');

	if (!props.username)
		return (<Error msg="didn't find connected user" />);
	else if (loading)
		return (<Loading />);
	else if (error)
		return (<Error msg={error.message} />);
	else
		return (<MatchHistoryArray matches={data} username={props.username} users={props.users} />);
}

function MatchHistoryArray(props: { matches: i_matchHistory[], username: string, users: i_user[] })
{
	let ret: JSX.Element[] = [];

	for (let i = 0; i < props.matches.length; i++)
	{ ret.push(<Match match={props.matches[i]} username={props.username} opponent={get_opponent(props.username, props.users)} />); }

	return (
		<div style={{ height: "100%", width: "100%" }}>
			{ret}
		</div>
	);
}

function Match(props: { match: i_matchHistory, username: string, opponent: i_user })
{
	const [showProfile, setShowProfile] = useState(false);

	//const win: boolean = props.match.won_round >= props.match.lost_round;
	const win: boolean = props.match.winner === props.username;
	const color = (win ? "#0B0" : "#B00")
	const border = "4px solid " + color;

	return (
		<div>
			<div className='card--match'
				style={{ border: border }}
				onClick={() => { setShowProfile(true) }}
			>
				<div className='card--alt--glow' style={{ marginLeft: "2rem", fontSize: "2rem" }}>
					<span style={{ color: "#67c61a" }}>{(win ? props.match.scoreWinner : props.match.scoreLoser)}</span>
					<span>|</span>
					<span style={{ color: "red" }}>{(win ? props.match.scoreLoser : props.match.scoreWinner)}</span>
				</div>
				<div className='truncate' style={{ padding: "0.3rem 1rem 0.3rem 2rem" }}>
					<span className='card--alt--glow' style={{ marginRight: "1rem" }}>{(win ? props.match.loser : props.match.winner)}</span>
					<img className='img'
						style={{ width: "3rem", height: "3rem" }}
						src={props.opponent.profilePicPath} alt="profile" />
				</div>
			</div>
			<div>
				{showProfile && <Backdrop onClick={() => { setShowProfile(false) }} />}
				{showProfile && <ProfileModal user={props.opponent} onClose={() => { setShowProfile(false) }} />}
			</div>
		</div>
	);
}

export default MatchHistory;
