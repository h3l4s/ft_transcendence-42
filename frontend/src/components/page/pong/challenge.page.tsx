import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../../context/auth.context";

import { useReqUser, useReqUsers } from "../../../request/user.request";
import Error from "../../request_answer_component/error.component";
import Loading from "../../request_answer_component/loading.component";
import { UserBtn } from "../chan/user.component";

function ChallengePage()
{
	const { user } = useContext(AuthContext);
	const challengedId = useParams().id;
	const challengedUser = useReqUser((challengedId ? +challengedId : 1));
	const reqUsers = useReqUsers();

	console.log(challengedId, challengedUser.loading, challengedUser.error);

	if (!user)
		return (<div className='ontop'><Error msg={"no info about connected user"} /></div>);
	else if (challengedUser.loading)
		return (<div className='ontop'><Loading /></div>);
	else if (challengedUser.error)
		return (<div className='ontop'><Error msg={challengedUser.error.message} /></div>);
	else if (!challengedUser.reqUser.id)
		return (<div className='ontop'><Error msg={"no info about challenged user"} /></div>);

	console.log("challengedUser", challengedUser.reqUser);
	console.log(reqUsers);

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
