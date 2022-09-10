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

function TwoFa()
{
	return (
		<div className='backdrop ontop'>
			<div className='modal--add--chan'>
				bonjour
			</div>
		</div>
	)
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
		if (new_user.twofa)
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
			{twoFA && <TwoFa />}
			{connected && !chooseUsername && <Navigate to='/' />}
			{connected && chooseUsername && <UsernameChangeModal callback={nameChoosen} />}
		</div>
	);
}

export default ConnectPage;
