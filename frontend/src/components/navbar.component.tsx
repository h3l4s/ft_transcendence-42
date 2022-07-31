import { Link } from 'react-router-dom';

import '../style/navbar.css';

import { ReactComponent as Home } from '../icon/home-icon-silhouette-svgrepo-com.svg'
import { ReactComponent as Play } from '../icon/ping-pong-svgrepo-com.svg'
import { ReactComponent as Chat } from '../icon/chat-svgrepo-com.svg'
import { ReactComponent as Profile } from '../icon/profile-user-svgrepo-com.svg'

function NavBar()
{
	return (
		<nav className='nav'>
			<Link to='/'><Home /></Link>
			<Link to='/play' className='nav--middle'><Play /></Link>
			<ul>
				<li>
					<Link to='/chan'><Chat /></Link>
				</li>
				<li>
					<Link to='/user'><Profile /></Link>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
