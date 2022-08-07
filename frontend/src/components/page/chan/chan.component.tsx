import React, { useState } from "react";

import i_chan from "../../../interface/chan.interface";
import i_user from "../../../interface/user.interface";

import { SearchByName } from "../../../utils/search_by_name";
import get_id from "../../../utils/get_id";

import Chat from "./chat.component";
import { UserBtn } from "./user.component";

function ChanUsers(props: { users_id: number[] | undefined, users: i_user[] }): JSX.Element
{
	let ret: JSX.Element[] = [];

	if (!props.users_id)
		return (<div />);

	for (let i = 0; i < props.users.length; i++)
	{
		if (props.users_id[0] === -1 || (props.users[i].id && props.users_id.includes(props.users[i].id!)))
			ret.push(<UserBtn user={props.users[i]} />);
	}

	return (
		<div>
			{ret}
		</div>
	);
}

function Chans(props: { chans: i_chan[], users: i_user[], to_chan: number })
{
	const [search, setSearch] = useState("");
	const [selectedChan, setSelectedChan] = useState<i_chan>(get_id(props.chans, props.to_chan));

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
					<Chat obj={selectedChan} />
				</div>
			</div>

			<div className='split split--chan split--right'>
				<div className='split--center--div' /*this style doesn't exist*/>
					<ChanUsers users_id={selectedChan.usersId} users={props.users} />
				</div>
			</div >
		</div >
	);
}

export default Chans;
