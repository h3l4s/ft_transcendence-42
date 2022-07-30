import '../style/navbar.css';

import { ReactComponent as Home } from '../icon/home-icon-silhouette-svgrepo-com.svg'
import { ReactComponent as Chat } from '../icon/chat-svgrepo-com.svg'
import { ReactComponent as Profile } from '../icon/profile-user-svgrepo-com.svg'

function NavBar()
{
	const icon_size = "50vh";
	const fill = "white";

	return (
		<nav className='nav'>
			<a href='/' className='nav--home'><Home width={icon_size} height={icon_size} fill={fill} /></a>
			<ul>
				<li>
					<a href='/chan'><Chat width={icon_size} height={icon_size} fill={fill} /></a>
				</li>
				<li>
					<a href='/profile'><Profile width={icon_size} height={icon_size} fill={fill} /></a>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
