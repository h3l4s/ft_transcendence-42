import { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../../context/auth.context";

import { useReqUser } from "../../../request/user.request";
import Error from "../../request_answer_component/error.component";
import Loading from "../../request_answer_component/loading.component";
import { UserBtn } from "../chan/user.component";

function ChallengePage()
{
	const { user } = useContext(AuthContext);
	const challengedId = useParams().id;
	const challengedUser = useReqUser((challengedId ? challengedId : 1));

	if (!user)
		return (<div className='ontop'><Error msg={"no info about connected user"} /></div>);
	else if (challengedUser.loading)
		return (<div className='ontop'><Loading /></div>);
	else if (challengedUser.error)
		return (<div className='ontop'><Error msg={challengedUser.error.message} /></div>);

	return (
		<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
			<UserBtn user={user} />
			vs
			<UserBtn user={challengedUser.reqUser} />
		</div>
	);
}

export default ChallengePage;
