import i_user from "../../../interface/user.interface";

import { requestUser } from "../../../utils/BackToFront";
import { Users } from "../chan/user.component";

function UserListById(props: { users_id: number[] | null })
{
	console.log("friend:", props.users_id);
	if (!props.users_id)
		return (<div></div>);

	let users: i_user[] = [];

	for (let i = 0; i < props.users_id!.length; i++)
	{
		requestUser(props.users_id![i]).then(value =>
		{
			if (value)
				users.push(value)
		});
	}

	console.log("users:", users);
	return (
		<div>
			<Users users={users} />
		</div>
	);
}

export default UserListById;
