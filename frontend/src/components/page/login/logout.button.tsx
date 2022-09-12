import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../../context/auth.context';

import { ReactComponent as Logout } from '../../../icon/logout-svgrepo-com.svg'

function LogoutButton(props: { style?: React.CSSProperties })
{
	const { user, setUser } = useContext(AuthContext);

	if (!user && !localStorage.getItem('user'))
		return (<Navigate to='/login' />);

	function handleLogout()
	{
		localStorage.removeItem('user');
		setUser(null);
	}

	return (
		<button className='logout' style={props.style} onClick={handleLogout}>
			<Logout />
		</button>
	);
}

export default LogoutButton;
