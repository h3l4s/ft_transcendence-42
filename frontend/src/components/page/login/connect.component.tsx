import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import useFetch from "../../../request/useFetch";

import { ApiUrlContext } from "../../../context/apiUrl.context";
import { AuthContext } from "../../../context/auth.context";

import i_user from "../../../interface/user.interface";

import LoginPage from "./login.component";
import Loading from "../../request_answer_component/loading.component";
import Error from "../../request_answer_component/error.component";
import UsernameChangeModal from "../../modal/username.change.modal";

function ConnectPage()
{
	const { apiUrl } = useContext(ApiUrlContext);
	const { setUser } = useContext(AuthContext);
	const token = useParams().token;
	const { data, loading, error } = useFetch(apiUrl + "/user/42Auth/" + token, 'get');
	const [created, setCreated] = useState(false);
	const [connected, setConnected] = useState(false);

	if (!token)
		return (<div className='backdrop ontop'><Error msg="token not found" /></div>);

	if (data.username && data.username.length > 0)
		connect(data);
	else if (data)
	{
		console.log("user created", data);
		setUser(data);
		setCreated(true);
	}

	function connect(new_user: i_user)
	{
		setUser(new_user);
		setConnected(true);
	}

	return (
		<div>
			<LoginPage />
			<div className='backdrop'></div>
			{loading && <div className='ontop'><Loading /></div>}
			{error && <div className='ontop'><Error msg={error.message} /></div>}
			{created && <UsernameChangeModal callback={connect} />}
			{connected && <Navigate to='/' />}
		</div>
	);
}

export default ConnectPage;
