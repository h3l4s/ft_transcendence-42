import i_chan from "../../interface/chan.interface";
import i_user from "../../interface/user.interface";

function OptionModal(props: {
	user: i_user,
	chan: i_chan,
	is_admin: boolean,
	is_owner: boolean,
	options: {
		setShowAdd: (value: React.SetStateAction<boolean>) => void,
		setShowChallenge: (value: React.SetStateAction<boolean>) => void,
		setShowMute: (value: React.SetStateAction<boolean>) => void,
		setShowAdminAdd: (value: React.SetStateAction<boolean>) => void,
		setShowAdminBan: (value: React.SetStateAction<boolean>) => void,
		setShowAdminMute: (value: React.SetStateAction<boolean>) => void,
		setShowOwnerPwd: (value: React.SetStateAction<boolean>) => void,
	}
	onClose: () => void
})
{
	return (
		<div onMouseLeave={props.onClose} className='modal--option'>
			<div>
				{props.chan.id !== 1 && <button>quit</button>}
				{props.chan.id !== 1 && <button>invite</button>}
			</div>
			<div>
				<button>challenge</button>
				<button>block</button>
			</div>
			<div>
				{props.is_admin && <button>admin ban</button>}
				{props.is_admin && <button>admin mute</button>}
			</div>
			<div>
				{props.is_admin && <button>admin add</button>}
				{props.is_owner && <button>owner pwd</button>}
			</div>
		</div>
	);
}

export default OptionModal;
