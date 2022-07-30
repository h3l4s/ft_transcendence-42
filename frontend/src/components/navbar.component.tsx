import '../style/navbar.css';

import { ReactComponent as Home } from '../icon/home-icon-silhouette-svgrepo-com.svg'
import { ReactComponent as Play } from '../icon/ping-pong-svgrepo-com.svg'
import { ReactComponent as Chat } from '../icon/chat-svgrepo-com.svg'
import { ReactComponent as Profile } from '../icon/profile-user-svgrepo-com.svg'

function NavBar()
{
	return (
		<nav className='nav'>
			<a href='/'><Home /></a>
			<a href='/play' className='nav--middle'><Play /></a>
			<ul>
				<li>
					<a href='/chan'><Chat /></a>
				</li>
				<li>
					<a href='/profile'><Profile /></a>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
