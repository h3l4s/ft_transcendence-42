import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

import useFetch from "../../../request/useFetch";

import { ApiUrlContext } from "../../../context/apiUrl.context";
import { AuthContext } from "../../../context/auth.context";

import i_user from "../../../interface/user.interface";

import LoginPage from "./login.page";
import Loading from "../../request_answer_component/loading.component";
import Error from "../../request_answer_component/error.component";

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
			props.callback(data);
	}, [data, props]);

	if (loading)
		return (<div className='backdrop ontop'><Loading /></div>);
	else if (error)
		return (<div className='backdrop ontop'><Error msg={error.message} /></div>);

	return (<div />);
}

function ConnectPage()
{
	const { user, setUser } = useContext(AuthContext);
	const token = useParams().token;
	const [connected, setConnected] = useState(false);

	if (!token)
		return (<div className='backdrop ontop'><Error msg="token not found" /></div>);
	if (!process.env.REACT_APP_UID)
		return (<div className='backdrop ontop'><Error msg="uid not found" /></div>);
	if (!process.env.REACT_APP_SECRET)
		return (<div className='backdrop ontop'><Error msg="secret not found" /></div>);

	function connect(new_user: i_user)
	{
		setUser(new_user);
		setConnected(true);
	}

	return (
		<div>
			<LoginPage />
			<div className='backdrop'></div>
			{!connected && !user && <Connect token={token} callback={connect} />}
			{connected && <Navigate to='/' />}
		</div>
	);
}

export default ConnectPage;
