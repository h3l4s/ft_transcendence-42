import axios from "axios";
import { useContext } from "react";

import { AuthContext } from "../../context/auth.context";

import i_user from "../../interface/user.interface";

import { ReactComponent as Back } from '../../icon/left-svgrepo-com.svg'

function PickUser(props: {
	c_user: i_user, // clicked
	chanId: number,
	type: 'add' | 'challenge' | 'mute' | 'admin add' | 'admin ban' | 'admin mute',
	onClose: () => void
})
{
	const { user } = useContext(AuthContext);
	if (!user)
		return (<div />);
	if (!props.c_user.id)
		return (<div />);

	function request()
	{
		if (!props.c_user.id)
			return;
		switch (props.type)
		{
			case 'add':
				axios.post("http://localhost:3000/chan/add/" + props.chanId + "/" + props.c_user.id, { userId: props.c_user.id }).catch(err => console.log(err));
				break;
			case 'challenge':
				axios.post("http://localhost:3000/chan/challenge/" + user?.id + "/" + props.c_user.id, { userId: props.c_user.id }).catch(err => console.log(err));
				break; // voir comment est gere le match making pour /play/current_user/clicked_user
			case 'mute':
				axios.post("http://localhost:3000/chan/mute/" + user?.id + "/" + props.c_user.id).catch(err => console.log(err));
				break; // le user est bien ajouter a la liste des mute dans le back mais n'est pas mute sur le site
						// add le user selectionne par le current user dans la liste ds mutedid du current user
			case 'admin add':
				axios.post("http://localhost:3000/chan/adminadd/" + props.chanId + "/" + props.c_user.id).catch(err => console.log(err));
				break;
			case 'admin ban':
				axios.post("http://localhost:3000/chan/adminban/" + props.chanId + "/" + props.c_user.id).catch(err => console.log(err));
				break; // ajoute le user selectionne (si le curent user est bien admin) dans les banedid du chan
			case 'admin mute':
				axios.post("http://localhost:3000/chan/adminmute/" + props.chanId + "/" + props.c_user.id).catch(err => console.log(err));
				break; // ajouter le user selectionne (si le curent user est bien admin) dans les mutedid du chan
		}
		props.onClose();
	}

	return (
		<button className='pick--user' onClick={request}>
			<img className='img' style={{ height: "3rem", width: "3rem" }}
				src={props.c_user.profilePicPath} alt="profile" />
			<div className='truncate' style={{ marginTop: "0.8rem" }}>
				{props.c_user.name}
			</div>
		</button>
	);
}

function PickUsers(props: {
	users: i_user[],
	chanId: number,
	type: 'add' | 'challenge' | 'mute' | 'admin add' | 'admin ban' | 'admin mute',
	onClose: () => void
}): JSX.Element
{
	const { user } = useContext(AuthContext);

	if (!user)
		return (<div />);

	let ret: JSX.Element[] = [];

	for (let i = 0; i < props.users.length; i++)
		if (props.users[i].id !== user.id)
			ret.push(<PickUser key={i} c_user={props.users[i]} chanId={props.chanId} type={props.type} onClose={props.onClose} />);

	return (<div>{ret}</div>);
}

function PickUserModal(props: {
	users: i_user[],
	chanId: number | undefined,
	type: 'add' | 'challenge' | 'mute' | 'admin add' | 'admin ban' | 'admin mute',
	goBack: () => void
	onClose: () => void
})
{
	if (!props.chanId)
		return (<div />);

	return (
		<div onMouseLeave={props.onClose} className='modal--pick'>
			<div>
				<button style={{ position: "absolute", top: "1rem", left: "1rem" }} onClick={() => props.goBack()}><Back /></button>
				<span style={{ fontSize: "1.5rem", fontWeight: "bolder" }}>{props.type}</span>
			</div>
			<div style={{ marginTop: "1rem" }}>
				<PickUsers users={props.users} chanId={props.chanId} type={props.type} onClose={props.onClose} />
			</div>
		</div>
	);
}

export default PickUserModal;
