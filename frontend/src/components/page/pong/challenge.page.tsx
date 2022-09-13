import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../../context/auth.context";
import { StatusContext } from "../../../context/status.context";

import { useReqUser } from "../../../request/user.request";
import Error from "../../request_answer_component/error.component";
import Loading from "../../request_answer_component/loading.component";
import { UserBtn } from "../user/user.component";

function ChallengePage()
{
	const { user } = useContext(AuthContext);
	const { socket } = useContext(StatusContext);
	const senderId = useParams().senderId;
	const receiverId = useParams().receiverId;
	const senderUser = useReqUser((senderId ? parseInt(senderId) : 1));
	const receiverUser = useReqUser((receiverId ? parseInt(receiverId) : 1));

	useEffect(() =>
	{
		if (socket && user && user.id && senderId && user.id === parseInt(senderId))
			socket.emit('challenge', { senderId: parseInt(senderId), receiverId: parseInt(receiverId!) });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!socket)
		return (<div className='ontop'><Error msg={"no socket"} /></div>);
	else if (senderUser.loading || receiverUser.loading)
		return (<div className='ontop'><Loading /></div>);
	else if (senderUser.error)
		return (<div className='ontop'><Error msg={senderUser.error.message} /></div>);
	else if (receiverUser.error)
		return (<div className='ontop'><Error msg={receiverUser.error.message} /></div>);
	else if (!senderUser.reqUser.id || !receiverUser.reqUser.id)
		return (<div className='ontop'><Error msg={"no user"} /></div>);

	console.log("sender", senderUser.reqUser);
	console.log("receiver", receiverUser.reqUser);

	return (
		<div style={{ height: "100vh", backgroundColor: "var(--background-color)", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
				<UserBtn user={senderUser.reqUser} />
				vs
				<UserBtn user={receiverUser.reqUser} />
			</div>
		</div>
	);
}

export default ChallengePage;
