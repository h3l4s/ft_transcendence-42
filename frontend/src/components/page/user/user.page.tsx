import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import '../../../style/chan.css';
import '../../../style/user.css';

import i_user from '../../../interface/user.interface';
import i_matchHistory from '../../../interface/matchHistory.interface';

import { AuthContext } from '../../../context/auth.context';

import UserStats from './userstats.component';
import MatchHistoty from './matchHistory';

function UserPage()
{
	const { username } = useContext(AuthContext);

	/* tmp until fetch from db */
	let user: i_user = { name: "" }

	const params = useParams();
	user.name = (!params.username ? (typeof username === 'string' ? username : "") : params.username);
	user = (user.name === "adelille" ?
		{ name: user.name, profilePicPath: "profile_picture/adelille.png", win: 42, lose: 21, elo: 1200, xp: 312 } :
		{ name: user.name, profilePicPath: "profile_picture/default.png", win: 0, lose: 0, elo: 1000, xp: 0 });
	user.profilePicPath = "http://localhost:3000/" + user.profilePicPath;	// will get from db later

	let matches: i_matchHistory[] = [];
	let tmp_users: i_user[] = [];

	tmp_users.push({ name: "idhiba", profilePicPath: "profile_picture/default.png" });
	tmp_users.push({ name: "glaverdu", profilePicPath: "profile_picture/default.png" });

	matches.push({ opponent: tmp_users[0], won_round: 5, lost_round: 4 });
	matches.push({ opponent: tmp_users[1], won_round: 5, lost_round: 2 });
	matches.push({ opponent: tmp_users[0], won_round: 3, lost_round: 5 });

	// need to check if user exist in db

	return (
		<div className='user--page' >
			<div style={{ width: "30vw", height: "100%", display: "flex", flexDirection: "column", margin: "0 1rem 0 0" }}>
				<div className='card card--border user--page--pic--title' style={{ marginBottom: "2rem" }} >
					<div style={{ margin: "0.5rem 0 0.5rem 0" }}><img className='img' style={{ height: "22vw", width: "22vw" }}
						src={user.profilePicPath} alt="profile" /></div>
					<div className='user--page-title truncate'>{user.name}</div>
				</div>
				<div className='card card--alt' style={{ height: "100%" }}>
					<UserStats user={user} />
				</div>
			</div>
			<div className='card card--alt' style={{ width: "40vw", height: "100%", margin: "0 2rem 0 -0.3rem" }}>
				<MatchHistoty matches={matches} />
			</div>
			<div className='card card--border' style={{ width: "30vw", margin: "0 2rem 0 0" }}>
				friend
			</div>
		</div >
	);
}

export default UserPage;
