import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import { ApiUrlContext } from '../../../context/apiUrl.context';
import { AuthContext } from '../../../context/auth.context';

import i_user from '../../../interface/user.interface';

import { Users } from '../chan/user.component';
import { userBacktoFront } from '../../../request/user.request';

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

	// debug
	const [id, setId] = useState(2);
	const [users, setUsers] = useState<i_user[]>([]);
	const navigate = useNavigate();

	function debugCreateUser(username: string)
	{
		axios.post(apiUrl + "/user/name/" + username).then(res => console.log(res)).catch(err => console.log(err));
	}

	async function debugGetUsers()
	{
		const get_answer = await axios.get(apiUrl + "/user");
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
			window.location.replace("https://api.intra.42.fr/oauth/authorize?client_id=" + process.env.REACT_APP_UID + "&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Flogin&response_type=code");
	};

	return (
		<div style={{ backgroundColor: "var(--background-color)", height: "calc(100vh - var(--nav-h))" }}>
			<div style={{ paddingTop: "5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
				<button onClick={auth42}>42 Auth</button>
			</div>
			<div>
				<h3>🚧 DEBUG 🚧</h3>
				{user ? (
					<button onClick={() => setUser(null)}>
						🚧 test logout 🚧
					</button>
				) : (
					<div>
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
					<input className='input--chat' placeholder="🚧 create user 🚧" onKeyPress={(event) =>
					{
						if (event.key === 'Enter')
						{
							event.preventDefault();
							debugCreateUser(event.target.value);
							event.target.value = "";
						}
					}} />
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
