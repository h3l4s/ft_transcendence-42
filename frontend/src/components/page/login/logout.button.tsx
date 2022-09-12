import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../../context/auth.context';
import { StatusContext } from '../../../context/status.context';

import { ReactComponent as Logout } from '../../../icon/logout-svgrepo-com.svg'

function LogoutButton(props: { style?: React.CSSProperties })
{
	const { user, setUser } = useContext(AuthContext);
	const { socket } = useContext(StatusContext);

	if (!user && !localStorage.getItem('user'))
		return (<Navigate to='/login' />);

	function handleLogout()
	{
		localStorage.removeItem('user');
		if (socket)
			socket.emit('updateStatus', { id: user!.id, status: 'offline' });
		setUser(null);
	}

	return (
		<button className='logout' style={props.style} onClick={handleLogout}>
			<Logout />
		</button>
	);
}

export default LogoutButton;
