import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import '../../../style/chan.css';
import '../../../style/user.css';

import i_user from '../../../interface/user.interface';
import i_matchHistory from '../../../interface/matchHistory.interface';

import { AuthContext } from '../../../context/auth.context';

import { ReactComponent as Friend } from '../../../icon/friend-svgrepo-com.svg'
import { ReactComponent as Edit } from '../../../icon/write-pencil-svgrepo-com.svg'

import { useReqUser } from '../../../request/user.request';
import UserStats from './userstats.component';
import MatchHistoty from './matchHistory.component';
import UserListById from './UserListById.component';
import NoMatch from '../nomatch.page';
import Loading from '../../loading.component';
import Error from '../../error.component';

function RequestByParam(username: string)
{
	const { reqUser, loading, error } = useReqUser(username);

	return ({ reqUser, loading, error });
}

function useFindUser(p_username: string | undefined, userAuth: i_user | null)
{
	let userToLoad: i_user;
	let loading: boolean;
	let error: { message: string } | null;

	if (p_username)
	{
		let tmp = RequestByParam(p_username);
		userToLoad = tmp.reqUser;
		loading = tmp.loading;
		error = tmp.error;
	}
	else if (userAuth)
	{
		userToLoad = userAuth;
		loading = false;
		error = null;
	}
	else
	{
		userToLoad = {};
		loading = false;
		error = { message: "failed to load" };
	}

	return ({ userToLoad, loading, error });
}

function UserPage()
{
	const { user } = useContext(AuthContext);
	const p_username = useParams().username;
	const { userToLoad, loading, error } = useFindUser(p_username, user);

	if (loading)
		return (<Loading />);
	else if (error && error.message === "failed to load")
		return (<Error msg={error.message} />);
	else if (error || !userToLoad.id)
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

	return (
		<div className='user--page' >
			<div style={{ width: "34vw", height: "100%", display: "flex", flexDirection: "column", margin: "0 1rem 0 0" }}>
				<div className='card card--border user--page--pic--title' style={{ marginBottom: "2rem" }} >
					<div style={{ margin: "0.5rem 0 0.5rem 0" }}>
						<img className='img' style={{ height: "23vw", width: "23vw" }}
							src={userToLoad.profilePicPath} alt="profile" />
						{(!p_username || p_username === userToLoad.name)
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
						(<span style={{ color: "var(--color-number)" }}>{(userToLoad.friendsId ? userToLoad.friendsId.length : 0)}</span>)
					</span>
				</div>
				<UserListById users_id={userToLoad.friendsId!} />
			</div>
		</div >
	);
}

export default UserPage;
