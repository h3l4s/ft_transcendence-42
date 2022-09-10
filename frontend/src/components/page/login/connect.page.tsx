import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import useFetch from "../../../request/useFetch";

import { ApiUrlContext } from "../../../context/apiUrl.context";
import { AuthContext } from "../../../context/auth.context";

import i_user from "../../../interface/user.interface";

import LoginPage from "./login.page";
import Loading from "../../request_answer_component/loading.component";
import Error from "../../request_answer_component/error.component";
import UsernameChangeModal from "../../modal/username.change.modal";
import axios from "axios";

function Connect(props: { token: string, callback: (new_user: i_user) => void })
{
	const { apiUrl } = useContext(ApiUrlContext);
	const { data, loading, error } = useFetch(apiUrl + "/user/auth42", 'post', {
		token: props.token,
		uid: process.env.REACT_APP_UID,
		secret: process.env.REACT_APP_SECRET
	});

	console.log("connecting:", data, loading, error);

	useEffect(() =>
	{
		if (data)
		{
			localStorage.setItem("user", JSON.stringify(data));
			props.callback(data);
		}
	}, [data, props]);

	if (loading)
		return (<div className='backdrop ontop'><Loading /></div>);
	else if (error)
		return (<div className='backdrop ontop'><Error msg={error.message} /></div>);

	return (<div />);
}

async function googleAuthValidate(): boolean
{
	let xrapid_key = "";
	let secret = "";

	if(process.env.REACT_APP_XRAPID_API_KEY)
	{
		xrapid_key = process.env.REACT_APP_XRAPID_API_KEY;
		console.log(xrapid_key);
	}
	if(process.env.REACT_APP_XRAPID_API_SECRET)
	{
		secret = process.env.REACT_APP_XRAPID_API_SECRET;
		console.log(secret);
	}
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

function TwoFa(props: {callback: (new_user: i_user) => void})
{
	const [twoFA, setTwoFA] = useState("");

	console.log("here");

	function handle2FA(event: any)
	{
		event.preventDefault();
		let res = event.target.value.replace(/\D/g, '');
		res = res.replace(/(.{3})/g, '$1 ');
		if (res.length >= 7)
		{
			const code = parseInt(res.replace(/ /g, ''));
			
		}
		setTwoFA(res);
	}

	return (
		<form className='modal--pick'>
			<div>two-factor authentication</div>
			<input className='form--input' type='text' required value={twoFA} onChange={handle2FA} />
		</form>
	);
}

function ConnectPage()
{
	const { user, setUser } = useContext(AuthContext);
	const token = useParams().token;
	const [connected, setConnected] = useState(false);
	const [twoFA, setTwoFA] = useState(false);
	const [chooseUsername, setChooseUsername] = useState(false);

	if (!token)
		return (<div className='backdrop ontop'><Error msg="token not found" /></div>);
	if (!process.env.REACT_APP_UID)
		return (<div className='backdrop ontop'><Error msg="uid not found" /></div>);
	if (!process.env.REACT_APP_SECRET)
		return (<div className='backdrop ontop'><Error msg="secret not found" /></div>);

	function connect(new_user: i_user)
	{
		if (!new_user.twofa)	// debug, please revert later
		{
			setTwoFA(true);
			return (<div />);
		}
		setUser(new_user);
		if (new_user.name && new_user.name[0] === '#')
			setChooseUsername(true);
		setConnected(true);
	}

	function nameChoosen(new_user: i_user)
	{
		setUser(new_user);
		setChooseUsername(false);
	}

	return (
		<div>
			<LoginPage />
			<div className='backdrop'></div>
			{!connected && !user && !chooseUsername && <Connect token={token} callback={connect} />}
			{twoFA && <TwoFa callback={connect}/>}
			{connected && !twoFA && !chooseUsername && <Navigate to='/' />}
			{connected && !twoFA && chooseUsername && <UsernameChangeModal callback={nameChoosen} />}
		</div>
	);
}

export default ConnectPage;
