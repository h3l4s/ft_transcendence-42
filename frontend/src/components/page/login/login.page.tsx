import { KeyboardEvent, useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios'

import '../../../style/login.css';

import { ApiUrlContext } from '../../../context/apiUrl.context';
import { AuthContext } from '../../../context/auth.context';

import i_user from '../../../interface/user.interface';

import { ReactComponent as Auth42 } from '../../../icon/42_Logo.svg'

import { Users } from '../chan/user.component';
import { userBacktoFront, } from '../../../request/user.request';
import LogoutButton from './logout.button';

async function requestUser(apiUrl: string, id: number): Promise<i_user | null>
{
	let user: i_user | null = null;

	await axios.get(apiUrl + "/user/" + id).then(res =>
	{
		console.log(res);
		user = userBacktoFront(res.data);
	}).catch(err =>
	{
		console.log(err);
	});

	return (user);
}

function LoginPage()
{
	const { apiUrl } = useContext(ApiUrlContext);
	const { user, setUser } = useContext(AuthContext);

	// debug variable
	const [id, setId] = useState(2);
	const [users, setUsers] = useState<i_user[]>([]);
	const navigate = useNavigate();
	// end of debug variable

	const access_token = new URLSearchParams(window.location.search).get('code');
	if (access_token)
		return (<Navigate to={"/connect/" + access_token} />);

	// debug function
	function debugKeyHandle(event: KeyboardEvent<HTMLInputElement>)
	{
		const target = event.target as HTMLInputElement;
		if (event.key === 'Enter')
		{
			event.preventDefault();
			debugCreateUser(target.value);
			target.value = "";
			debugGetUsers();
		}
	}

	function debugCreateUser(username: string)
	{
		axios.post(apiUrl + "/user/name/" + username).then(res => console.log(res)).catch(err => console.log(err));
	}

	async function debugGetUsers()
	{
		const get_answer = await axios.get(apiUrl + "/user/all");
		console.log(get_answer);
		let t_users: i_user[] = [];
		for (let i = 0; i < get_answer.data.length; i++)
			t_users.push(userBacktoFront(get_answer.data[i]));
		setUsers(t_users);
	}
	// end of debug

	function auth42()
	{
		console.log("UID", process.env.REACT_APP_UID);
		if (!process.env.REACT_APP_UID)
			window.location.replace("https://api.intra.42.fr/oauth/authorize?client_id=cbd1064bd58ef5065a103fbd35e3b251f506b89d0f101660714907581d0c9bd9&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Flogin&response_type=code");
		else
			window.location.replace("https://api.intra.42.fr/oauth/authorize?client_id=" + process.env.REACT_APP_UID + "&redirect_uri=http%3A%2F%2F" + window.location.hostname + "%3A3001%2Flogin&response_type=code");
	};

	return (
		<div className='login--page'>
			{!user ? (
				<button className='auth42 card--alt' onClick={auth42}>
					<Auth42 />
					<div>auth</div>
				</button>
			) : (
				<LogoutButton />
			)}
			<div className='login--debug'>
				<h3>🚧 DEBUG 🚧</h3>
				{user ? (
					<button onClick={() => setUser(null)}>
						🚧 test logout 🚧
					</button>
				) : (
					<div style={{ width: "100%" }}>
						<button onClick={async () =>
						{
							const tmp: i_user | null = await requestUser(apiUrl, id);
							setUser(tmp);
							if (tmp)
								navigate("/");
						}}>
							🚧 test login 🚧
							<br />
							(will login to user id: )
						</button>
						<input className='input--chat' style={{ width: "3rem", textAlign: "center" }}
							placeholder="id" onChange={(e) => setId(+e.target.value)} value={id} />
					</div>
				)}
				<div>
					<input className='input--chat' placeholder="🚧 create user 🚧" onKeyPress={debugKeyHandle} />
				</div>
				<button onClick={debugGetUsers}>🚧 get all users 🚧</button>
				<div>
					number of users: {users.length}
					<Users users={users} />
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
