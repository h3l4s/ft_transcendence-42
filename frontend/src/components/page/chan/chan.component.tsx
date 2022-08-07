import React, { useContext, useState } from "react";

import i_chan from "../../../interface/chan.interface";
import i_user from "../../../interface/user.interface";

import { AuthContext } from "../../../context/auth.context";

import { SearchByName } from "../../../utils/search_by_name";
import get_id from "../../../utils/get_id";

import Chat from "./chat.component";
import { Users } from "./user.component";

function get_user_in_chan(users_id: number[] | undefined, users: i_user[]): i_user[]
{
	let ret: i_user[] = [];

	if (!users_id)
		return ([]);

	for (let i = 0; i < users.length; i++)
	{
		if (users_id[0] === -1 || (users[i].id && users_id.includes(users[i].id!)))
			ret.push(users[i]);
	}

	return (ret);
}

function Chans(props: { chans: i_chan[], users: i_user[], to_chan: number })
{
	const { user } = useContext(AuthContext);
	const [search, setSearch] = useState("");
	const [selectedChan, setSelectedChan] = useState<i_chan>(get_id(props.chans, props.to_chan));
	const users_in_chan: i_user[] = get_user_in_chan(selectedChan.usersId, props.users);
	const is_user_admin: boolean = (selectedChan.adminsId && user && user.id && selectedChan.adminsId.includes(user.id) ? true : false)
	const is_user_owner: boolean = (selectedChan.ownerId && user && user.id && selectedChan.ownerId === user.id ? true : false)

	const searchHandle = (event: React.KeyboardEvent<HTMLInputElement>) =>
	{ setSearch(event.target.value); };

	function Chan(props: { obj: i_chan })
	{
		return (
			<div>
				<div className='card card--border card--btn card--chan' onClick={() => { setSelectedChan(props.obj) }}>{props.obj.name}</div>
			</div>
		);
	}

	return (
		<div>
			<input className='card--input input--search' type='text' placeholder='🔍 ' onChange={searchHandle} value={search} />
			<SearchByName objs={props.chans} query={search} Constructor={Chan} />

			<div className='split split--chan split--center'>
				<div className='split--center--div' /*this style doesn't exist*/>
					<Chat chan={selectedChan} users={users_in_chan} is_admin={is_user_admin} is_owner={is_user_owner} />
				</div>
			</div>

			<div className='split split--chan split--right'>
				<div className='split--center--div' /*this style doesn't exist*/>
					<Users users={users_in_chan} />
				</div>
			</div >
		</div >
	);
}

export default Chans;
