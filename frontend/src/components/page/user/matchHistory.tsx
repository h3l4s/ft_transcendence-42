import { useState } from "react";

import i_matchHistory from "../../../interface/matchHistory.interface";
import i_user from "../../../interface/user.interface";

import Backdrop from "../../modal/backdrop";
import ProfileModal from "../../modal/profile.modal";

function MatchHistoty(props: { matches: i_matchHistory[] })
{
	let ret: JSX.Element[] = [];

	for (let i = 0; i < Object.keys(props.matches).length; i++)
	{ ret.push(<Match match={props.matches[i]} />); }

	return (
		<div style={{ height: "100%", width: "100%" }}>
			{ret}
		</div>
	);
}

function Match(props: { match: i_matchHistory })
{
	const [showProfile, setShowProfile] = useState(false);

	const win: boolean = props.match.won_round >= props.match.lost_round;
	const color = (win ? "#0B0" : "#B00")
	const border = "4px solid " + color;

	return (
		<div>
			<div className='card--match'
				style={{ border: border }}
				onClick={() => { setShowProfile(true) }}
			>
				<div className='card--alt--glow' style={{ marginLeft: "1.5rem", fontSize: "2rem" }}>
					<span style={{ color: "#67c61a" }}>{props.match.won_round}</span>
					<span>|</span>
					<span style={{ color: "red" }}>{props.match.lost_round}</span>
				</div>
				<div className='truncate' style={{ padding: "1rem 1rem 1rem 2rem" }}>
					<span className='card--alt--glow' style={{ marginRight: "1rem" }}>{props.match.opponent.name}</span>
					<img className='img'
						style={{ width: "3rem", height: "3rem" }}
						src={props.match.opponent.profilePicPath} alt="profile" />
				</div>
			</div>
			<div>
				{showProfile && <Backdrop onClick={() => { setShowProfile(false) }} />}
				{showProfile && <ProfileModal user={props.match.opponent} onClose={() => { setShowProfile(false) }} />}
			</div>
		</div>
	);
}

export default MatchHistoty;
