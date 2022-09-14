import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { StatusContext } from "../context/status.context";
import { useReqUser } from "../request/user.request";
import Error from "./request_answer_component/error.component";
import Loading from "./request_answer_component/loading.component";

function SendAlert(props: { data: any, callback: () => void })
{
	const { reqUser, error, loading } = useReqUser(props.data.senderId);
	const navigate = useNavigate();

	if (loading)
		return (<div className='ontop'><Loading /></div>);
	else if (error)
		return (<div className='ontop'><Error msg={error.message} /></div>);
	console.log("TEST");
	if (window.confirm('You have been challenged by ' + reqUser.name + '. Do you accept?')){
		navigate("/challenge/" + props.data.senderId + "/" + props.data.receiverId + "/" );
	}
	props.callback();

	return (<div />);
}

function StatusHandler()
{
	const { socket } = useContext(StatusContext);
	const [sendAlert, setSendAlert] = useState<any | null>(null);

	useEffect(() =>
	{
		if (socket)
		{
			socket.on('challenge', (data: any) =>
			{
				console.log("challenge", data);
				setSendAlert(data);
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			{sendAlert && <SendAlert data={sendAlert} callback={() => setSendAlert(null)} />}
		</div>
	);
}

export default StatusHandler;
