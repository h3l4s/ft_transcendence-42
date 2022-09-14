import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../../context/auth.context';
import { StatusContext } from '../../../context/status.context';

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
			log-out
		</button>
	);
}

export default LogoutButton;
