import i_user from "../../../interface/user.interface";

import { useReqUser } from "../../../request/user.request";
import Error from "../../request_answer_component/error.component";
import Loading from "../../request_answer_component/loading.component";
import { UserBtn } from "../chan/user.component";

function ReqOne(id: number): JSX.Element
{
	const { reqUser, loading, error } = useReqUser(id);

	if (loading)
		return (<Loading />);
	else if (error)
		return (<Error msg={error.message} />);
	else
		return (<UserBtn user={reqUser} />);
}

function UserListById(props: { users_id: number[] | null }): JSX.Element
{
	if (!props.users_id)
		return (<div />);

	let ret: JSX.Element[] = [];

	for (let i = 0; i < props.users_id!.length; i++)
	{ ret.push(ReqOne(props.users_id[i])); }

	return (
		<div>
			{ret}
		</div>
	);
}

export default UserListById;
