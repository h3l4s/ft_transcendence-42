import { useState } from "react";

import i_user from "../../../interface/user.interface";
import i_chan from "../../../interface/chan.interface";

import { ReactComponent as Option } from '../../../icon/single-select-svgrepo-com.svg'

import Backdrop from "../../modal/backdrop";
import OptionModal from "../../modal/option.modal";
import PickUserModal from "../../modal/pick.user.modal";
import PickPwdModal from "../../modal/pick.pwd.modal";

function Chat(props: { chan: i_chan, users: i_user[], user: i_user, is_admin: boolean, is_owner: boolean })
{
	const [showOption, setShowOption] = useState(false);
	const [showAdd, setShowAdd] = useState(false);
	const [showChallenge, setShowChallenge] = useState(false);
	const [showMute, setShowMute] = useState(false);
	const [showAdminAdd, setShowAdminAdd] = useState(false);
	const [showAdminBan, setShowAdminBan] = useState(false);
	const [showAdminMute, setShowAdminMute] = useState(false);
	const [showOwnerPwd, setShowOwnerPwd] = useState(false);

	function resetAllStateHandle(): void
	{
		setShowOption(false);
		setShowAdd(false);
		setShowChallenge(false);
		setShowMute(false);
		setShowAdminAdd(false);
		setShowAdminBan(false);
		setShowAdminMute(false);
		setShowOwnerPwd(false);
	}

	return (
		<div>
			<div className='card card--alt card--chat' >
				<div className='card chan--title'>
					<div className='truncate'>- {props.chan.name} -</div>
					<button onClick={() => { setShowOption(true) }}>
						<Option />
					</button>
				</div>
				<input className='card--input input--chat' type='text' placeholder=' 💬' />
			</div>

			{(showOption || showAdd || showChallenge || showMute || showAdminAdd || showAdminBan || showAdminMute || showOwnerPwd)
				&& <Backdrop onClick={resetAllStateHandle} />}
			{showOption && <OptionModal
				user={props.user}
				chan={props.chan}
				is_admin={props.is_admin}
				is_owner={props.is_owner}
				options={
					{
						setShowAdd,
						setShowChallenge,
						setShowMute,
						setShowAdminAdd,
						setShowAdminBan,
						setShowAdminMute,
						setShowOwnerPwd,
					}}
				onClose={() => { setShowOption(false) }}
			/>}
			{showAdd && <PickUserModal users={props.users} type='add' onClose={() => { setShowAdd(false); setShowOption(false); }} />}
			{showChallenge && <PickUserModal users={props.users} type='challenge' onClose={() => { setShowChallenge(false); setShowOption(false); }} />}
			{showMute && <PickUserModal users={props.users} type='mute' onClose={() => { setShowMute(false); setShowOption(false); }} />}
			{props.is_admin && showAdminAdd && <PickUserModal users={props.users} type='admin add' onClose={() => { setShowAdminAdd(false); setShowOption(false); }} />}
			{props.is_admin && showAdminBan && <PickUserModal users={props.users} type='admin ban' onClose={() => { setShowAdminBan(false); setShowOption(false); }} />}
			{props.is_admin && showAdminMute && <PickUserModal users={props.users} type='admin mute' onClose={() => { setShowAdminMute(false); setShowOption(false); }} />}
			{props.is_owner && showOwnerPwd && <PickPwdModal onClose={() => { setShowOwnerPwd(false); setShowOption(false); }} />}
		</div>
	);
}

export default Chat;
