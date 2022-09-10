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

let secret:string;
let xrapid_key:string;

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

	// async function googleAuthQr(){
	// 	const options = {
	// 		method: 'GET',
	// 		url: 'https://google-authenticator.p.rapidapi.com/new_v2/',
	// 		headers: {
	// 		  'X-RapidAPI-Key': '6601bbc4a9mshd286de52b6adde8p1d960ejsnf414e828fa2a',
	// 		  'X-RapidAPI-Host': 'google-authenticator.p.rapidapi.com'
	// 		}
	// 	  };
		  
	// 	  axios.request(options).then(function (response) {
	// 		  console.log(response.data);
	// 		  secret = response.data;
	// 		  const options = {
	// 			method: 'GET',
	// 			url: 'https://google-authenticator.p.rapidapi.com/enroll/',
	// 			params: {secret: response.data, issuer: 'ft_transcendance', account: 'admin'},
	// 			headers: {
	// 			  'X-RapidAPI-Key': '6601bbc4a9mshd286de52b6adde8p1d960ejsnf414e828fa2a',
	// 			  'X-RapidAPI-Host': 'google-authenticator.p.rapidapi.com'
	// 			}
	// 		  };
			  
	// 		  axios.request(options).then(function (response) {
	// 			  window.open(response.data, '_blank');
	// 		  }).catch(function (error) {
	// 			  console.error(error);
	// 		  });
	// 	  }).catch(function (error) {
	// 		  console.error(error);
	// 	  });
	// }

	function googleAuthQr(){
		window.open('https://prore.ru/qrler.php?size=200x200&data=otpauth%3A%2F%2Ftotp%2Fft_transcendance%3Aadmin%3Fsecret%3D2EZ3X6LJCKVI4V7F%26issuer%3Dft_transcendance&ecc=M', '_blank');
	}

	async function googleAuthValidate(){
		if(process.env.REACT_APP_XRAPID_API_KEY){
			xrapid_key = process.env.REACT_APP_XRAPID_API_KEY;
			console.log(xrapid_key);
		}
		if(process.env.REACT_APP_XRAPID_API_SECRET){
			secret = process.env.REACT_APP_XRAPID_API_SECRET;
			console.log(secret);}
		let input = document.getElementById('googleValid') as HTMLInputElement | null;
		let code;
		if(input){
			code  = input.value;
			console.log(code);
		}
		const options = {
			method: 'GET',
			url: 'https://google-authenticator.p.rapidapi.com/validate/',
			params: {code: code, secret: secret},
			headers: {
			  'X-RapidAPI-Key': xrapid_key,
			  'X-RapidAPI-Host': 'google-authenticator.p.rapidapi.com'
			}
		  };
		  
		  axios.request(options).then(function (response) {
			  console.log(response.data);
		  }).catch(function (error) {
			  console.error(error);
		  });
	}

	return (
		<div className='login--page'>
			<button className='auth42 card--alt' onClick={auth42}>
				<Auth42 />
				<div>auth</div>
			</button>
			<div className='login--debug'>
			<button onClick={googleAuthQr}>get google qr code</button>
			<input id="googleValid"></input>
			<button onClick={googleAuthValidate}>get google auth validation</button>
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
