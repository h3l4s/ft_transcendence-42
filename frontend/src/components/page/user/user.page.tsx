import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import '../../../style/chan.css';
import '../../../style/user.css';

import i_user from '../../../interface/user.interface';
import i_matchHistory from '../../../interface/matchHistory.interface';

import { AuthContext } from '../../../context/auth.context';

import { ReactComponent as Friend } from '../../../icon/friend-svgrepo-com.svg'
import { ReactComponent as Edit } from '../../../icon/write-pencil-svgrepo-com.svg'

import { requestUserByName } from '../../../utils/BackToFront';
import UserStats from './userstats.component';
import MatchHistoty from './matchHistory.component';
import UserListById from './UserListById.component';
import NoMatch from '../nomatch.page';

function UserPage()
{
	const { user } = useContext(AuthContext);
	let userToLoad: i_user | null = null;

	const p_username = useParams().username;
	if (p_username)
		requestUserByName(p_username).then(value => { userToLoad = value });
	else
		userToLoad = user;
	if (!userToLoad)
		return (<NoMatch />);
	else
		console.log("user to load:", userToLoad);

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
							src={userToLoad.profilePicPath} alt="profile" />
						{(!p_username || p_username === (user && user.name))
							&& <div className='input--file'>
								<input type='file' style={{ zIndex: "99" }} />
								<Edit className='input--file--icon' />
							</div>
						}
					</div>
					<div className='user--page-title truncate'>{userToLoad.name}</div>
				</div>
				<div className='card card--alt' style={{ height: "100%" }}>
					<UserStats user={userToLoad} />
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
						(<span style={{ color: "var(--color-number)" }}>{userToLoad.friendsId!.length}</span>)
					</span>
				</div>
				<UserListById users_id={userToLoad.friendsId!} />
			</div>
		</div >
	);
}

export default UserPage;
