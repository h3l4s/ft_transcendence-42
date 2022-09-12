import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../../context/auth.context";
import { StatusContext } from "../../../context/status.context";

import { useReqUser, useReqUsers } from "../../../request/user.request";
import Error from "../../request_answer_component/error.component";
import Loading from "../../request_answer_component/loading.component";
import { UserBtn } from "../user/user.component";

function ChallengePage()
{
	const { user } = useContext(AuthContext);
	const { socket } = useContext(StatusContext);
	const challengedId = useParams().id;
	const challengedUser = useReqUser((challengedId ? +challengedId : 1));

	console.log(challengedId, challengedUser.loading, challengedUser.error);

	useEffect(() =>
	{
		if (socket && user && user.id !== challengedUser.reqUser.id)
			socket.emit('challenge', { senderId: user.id, receiverId: challengedUser.reqUser.id });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!user)
		return (<div className='ontop'><Error msg={"no info about connected user"} /></div>);
	if (!socket)
		return (<div className='ontop'><Error msg={"no socket"} /></div>);
	else if (challengedUser.loading)
		return (<div className='ontop'><Loading /></div>);
	else if (challengedUser.error)
		return (<div className='ontop'><Error msg={challengedUser.error.message} /></div>);
	else if (!challengedUser.reqUser.id)
		return (<div className='ontop'><Error msg={"no info about challenged user"} /></div>);

	console.log("challengedUser", challengedUser.reqUser);

	return (
		<div style={{ height: "100vh", backgroundColor: "var(--background-color)", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
			<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
				<UserBtn user={user} />
				vs
				<UserBtn user={challengedUser.reqUser} />
			</div>
		</div>
	);
}

export default ChallengePage;
