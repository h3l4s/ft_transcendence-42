import React, { useContext, useState } from "react";
import { Socket } from "socket.io-client";

import i_chan from "../../../interface/chan.interface";
import i_user from "../../../interface/user.interface";

import { AuthContext } from "../../../context/auth.context";

import { ReactComponent as Plus } from '../../../icon/plus-svgrepo-com.svg'

import { SearchByName } from "../../../utils/search_by_name";
import get_id from "../../../utils/get_id";

import { ReactComponent as Pwd } from '../../../icon/icons8-key.svg'

import Chat from "./chat.component";
import { Users } from "./user.component";
import Backdrop from "../../modal/backdrop";
import AddChanModal from "../../modal/chan.add.modal";
import PromptPwdModal from "../../modal/chan.prompt.pwd.modal";
import axios from "axios";

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

function Chans(props: { socket: Socket, chans: i_chan[], users: i_user[], to_chan: number, callback: (id: number) => void })
{
	const { user } = useContext(AuthContext);
	const [search, setSearch] = useState("");
	const [selectedChan, setSelectedChan] = useState<i_chan>(get_id(props.chans, props.to_chan));
	const [showAddChan, setShowAddChan] = useState(false);
	const [showPromptPwd, setShowPomptPwd] = useState(false);
	const [chanPwd, setChanPwd] = useState<i_chan>(selectedChan);
	const users_in_chan: i_user[] = get_user_in_chan((selectedChan ? selectedChan.usersId : [-1]), props.users);
	const is_user_admin: boolean = (selectedChan && selectedChan.adminsId && user && user.id && selectedChan.adminsId.includes(user.id) ? true : false)
	const is_user_owner: boolean = (selectedChan && selectedChan.ownerId && user && user.id && selectedChan.ownerId === user.id ? true : false)

	const searchHandle = (event: React.KeyboardEvent<HTMLInputElement>) =>
	{ setSearch(event.target.value); };

	function leaveRoom()
	{
		props.socket.emit('leaveRoom', selectedChan.toString());
	}

	function joinRoom(id: number)
	{
		props.socket.emit('joinRoom', id.toString());
	}

	function Chan(props: { obj: i_chan })
	{
		if (!props.obj.usersId || !user || !user.id)
			return (<div />);

		const is_in_chan: boolean = props.obj.usersId.includes(user.id);

		return (
			<div>
				<div className='card card--border card--btn card--chan' onClick={() =>
				{
					if (!props.obj.id)
						return;
					if (!is_in_chan)
					{
						setShowPomptPwd(true);
						setChanPwd(props.obj);
						return;
					}
					leaveRoom();
					joinRoom(props.obj.id);
					setSelectedChan(props.obj);
				}}>
					<span>{props.obj.name}</span>
					{props.obj.type === 'protected' && <span>
						<Pwd style={{
							fill: (is_in_chan ?
								"#0008" : "hsl(0, 100%, 40%)"
							)
						}} />
					</span>}
				</div>
			</div>
		);
	}

	function endOfForm(chan: i_chan)
	{
		setShowAddChan(false);
		setSelectedChan(chan);
		props.callback((chan.id ? chan.id : 1));
	}

	function endOfPromptPwd()
	{
		if (!chanPwd.id || !user || !user.id)
		{
			console.log("ERROR: endOfPromptPwd unset values:", chanPwd, user)
			return;
		}
		axios.put("http://localhost:3000/chan/join/" + chanPwd.id + "/" + user.id).then(() =>
		{
			setShowPomptPwd(false);
			setSelectedChan(chanPwd);
			props.callback((chanPwd.id ? chanPwd.id : 1));
		}).catch(err => console.log(err));
	}

	return (
		<div>
			<div className='split split--chan split--left' style={{ height: "100vh", overflow: "scroll", padding: "1.5rem 0 calc(1.5rem + var(--nav-h)) 0" }}>
				<div style={{ display: "flex", flexDirection: "row" }}>
					<input className='card--input input--search' type='text' placeholder='🔍 ' onChange={searchHandle} value={search} />
					<button className='btn--plus' onClick={() => setShowAddChan(true)}>
						<Plus />
					</button>
				</div>
				<SearchByName objs={props.chans} query={search} Constructor={Chan} />
			</div>

			<div className='split split--chan split--center'>
				{selectedChan && user && <Chat
					socket={props.socket} chan={selectedChan}
					all_users={props.users} users={users_in_chan} user={user} is_admin={is_user_admin} is_owner={is_user_owner} />}
			</div>

			<div className='split split--chan split--right'>
				<Users users={users_in_chan} />
			</div >

			{(showAddChan || showPromptPwd) && <Backdrop onClick={() => { setShowAddChan(false); setShowPomptPwd(false); }} />}
			{showAddChan && user && user.id && <AddChanModal user_id={user.id} callback={endOfForm} />}
			{showPromptPwd && <PromptPwdModal chan_id={chanPwd.id} callback={endOfPromptPwd} />}
		</div >
	);
}

export default Chans;
