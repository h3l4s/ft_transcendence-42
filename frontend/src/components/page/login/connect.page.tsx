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

function TwoFa(props: { callback: () => void })
{
	const [twoFA, setTwoFA] = useState("");
	const [valid, setValid] = useState(true);

	function handle2FA(event: any)
	{
		event.preventDefault();
		let res = event.target.value.replace(/\D/g, '');
		res = res.replace(/(.{3})/g, '$1 ');

		if (!process.env.REACT_APP_XRAPID_API_KEY || !process.env.REACT_APP_XRAPID_API_SECRET)
		{
			console.warn("XRapid API key or secret not set");
			return;
		}

		setValid(true);
		setTwoFA(res);

		if (res.length < 7)
			return;

		const code = parseInt(res.replace(/ /g, ''));

		const options = {
			method: 'GET',
			url: 'https://google-authenticator.p.rapidapi.com/validate/',
			params: { code: code, secret: process.env.REACT_APP_XRAPID_API_SECRET },
			headers: {
				'X-RapidAPI-Key': process.env.REACT_APP_XRAPID_API_KEY,
				'X-RapidAPI-Host': 'google-authenticator.p.rapidapi.com'
			}
		};
		axios.request(options).then(res =>
		{
			console.log(res);
			if (res.data === "True")
				props.callback();
			else
				setValid(false);
		}).catch(err => console.log(err));

		setTwoFA("");
	}

	return (
		<form className='modal--add--chan' style={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
			<div>two-factor authentication</div>
			<input className='form--input' type='text' required value={twoFA} onChange={handle2FA} />
			{!valid ? (
				<div><Error msg="invalid code" /></div>
			) : (
				<div />
			)}
		</form>
	);
}

function ConnectPage()
{
	const { user, setUser } = useContext(AuthContext);
	const token = useParams().token;
	const [connected, setConnected] = useState(false);
	const [twoFA, setTwoFA] = useState((user ? !user.twofa : false));
	const [chooseUsername, setChooseUsername] = useState(false);

	if (!token)
		return (<div className='backdrop ontop'><Error msg="token not found" /></div>);
	if (!process.env.REACT_APP_UID)
		return (<div className='backdrop ontop'><Error msg="uid not found" /></div>);
	if (!process.env.REACT_APP_SECRET)
		return (<div className='backdrop ontop'><Error msg="secret not found" /></div>);

	function connect(new_user: i_user)
	{
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
			{connected && twoFA && <TwoFa callback={() => setTwoFA(false)} />}
			{connected && !twoFA && chooseUsername && <UsernameChangeModal callback={nameChoosen} />}
			{connected && !twoFA && !chooseUsername && <Navigate to='/' />}
		</div>
	);
}

export default ConnectPage;
