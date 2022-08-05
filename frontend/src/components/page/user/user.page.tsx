import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import '../../../style/chan.css';
import '../../../style/user.css';

import i_user from '../../../interface/user.interface';
import i_matchHistory from '../../../interface/matchHistory.interface';

import { AuthContext } from '../../../context/auth.context';

import { ReactComponent as Friend } from '../../../icon/friend-svgrepo-com.svg'
import { ReactComponent as Edit } from '../../../icon/write-pencil-svgrepo-com.svg'

import UserStats from './userstats.component';
import MatchHistoty from './matchHistory';
import { Users } from '../chan/user.component';
import { useFormControl } from '@mui/material';

function UserPage()
{
	const { user } = useContext(AuthContext);

	/* tmp until fetch from db */
	let user_to_load: i_user = { name: "" }

	const params = useParams();
	user_to_load.name = (!params.username ? (user ? user.name : "") : params.username);
	user_to_load = (user_to_load.name === "adelille" ?
		{ name: user_to_load.name, profilePicPath: "profile_picture/adelille.png", win: 42, lose: 21, elo: 1200, xp: 312 } :
		{ name: user_to_load.name, profilePicPath: "profile_picture/default.png", win: 0, lose: 0, elo: 1000, xp: 0 });
	user_to_load.profilePicPath = "http://localhost:3000/" + user_to_load.profilePicPath;	// will get from db later

	let matches: i_matchHistory[] = [];
	let tmp_users: i_user[] = [];

	tmp_users.push({ name: "idhiba", profilePicPath: "profile_picture/default.png" });
	tmp_users.push({ name: "glaverdu", profilePicPath: "profile_picture/default.png" });
	tmp_users.push({ name: "very_long_text_very_long_text_very_long_text_very_long_text_very_long_text", profilePicPath: "profile_picture/default.png" });

	for (let i = 0; i < 20; i++)
		tmp_users.push({ name: i.toString(), profilePicPath: "profile_picture/default.png" });

	matches.push({ opponent: tmp_users[0], won_round: 5, lost_round: 4 });
	matches.push({ opponent: tmp_users[1], won_round: 5, lost_round: 2 });
	matches.push({ opponent: tmp_users[0], won_round: 3, lost_round: 5 });

	for (let i = 0; i < 20; i++)
		matches.push({ opponent: tmp_users[2], won_round: 5, lost_round: 0 });

	// need to check if user exist in db

	return (
		<div className='user--page' >
			<div style={{ width: "34vw", height: "100%", display: "flex", flexDirection: "column", margin: "0 1rem 0 0" }}>
				<div className='card card--border user--page--pic--title' style={{ marginBottom: "2rem" }} >
					<div style={{ margin: "0.5rem 0 0.5rem 0" }}>
						<img className='img' style={{ height: "23vw", width: "23vw" }}
							src={user_to_load.profilePicPath} alt="profile" />
						{(!params.username || params.username === (user && user.name))
							&& <div className='input--file'>
								<input type='file' style={{ zIndex: "99" }} />
								<Edit className='input--file--icon' />
							</div>
						}
					</div>
					<div className='user--page-title truncate'>{user_to_load.name}</div>
				</div>
				<div className='card card--alt' style={{ height: "100%" }}>
					<UserStats user={user_to_load} />
				</div>
			</div>
			<div className='card card--alt' style={{ width: "33vw", height: "100%", margin: "0 2rem 0 -0.3rem", overflowY: "scroll" }}>
				<MatchHistoty matches={matches} />
			</div>
			<div style={{ width: "33vw", margin: "-1rem 0 -2rem 0", padding: "0.3rem 0 2rem 0", overflowX: "hidden" }}>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0.7rem 1rem 0 0" }}>
					<Friend style={{ width: "3rem", height: "3rem" }} />
					<div style={{ margin: "0 1rem 0 1rem" }} />
					<span style={{ color: "#000", fontFamily: "var(--alt-font)", fontSize: "2rem" }}>
						(<span style={{ color: "var(--color-number)" }}>{tmp_users.length}</span>)
					</span>
				</div>
				<Users users={tmp_users} />
			</div>
		</div >
	);
}

export default UserPage;
