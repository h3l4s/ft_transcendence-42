import i_user from "../../interface/user.interface";

function PickUserModal(props: {
	users: i_user[],
	type: 'add' | 'challenge' | 'mute' | 'admin add' | 'admin ban' | 'admin mute',
	onClose: () => void
})
{
	return (
		<div onMouseLeave={props.onClose} className='modal--option'>
			options
		</div>
	);
}

export default PickUserModal;
