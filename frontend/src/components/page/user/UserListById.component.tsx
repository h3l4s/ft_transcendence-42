import i_user from "../../../interface/user.interface";

import { useReqUser } from "../../../request/useFetch";
import Error from "../../error.component";
import Loading from "../../loading.component";
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
