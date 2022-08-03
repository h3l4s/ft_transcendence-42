import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import '../../style/chan.css'

import { AuthContext } from '../../context/auth.context';

import i_user from '../../interface/user.interface';

import { ReactComponent as ProfilePage } from '../../icon/profile-user-svgrepo-com.svg';
import { ReactComponent as AddFriend } from '../../icon/add-friend-svgrepo-com.svg';
import { ReactComponent as RemoveFriend } from '../../icon/delete-unfriend-svgrepo-com.svg';
import { ReactComponent as Heart } from '../../icon/heart-friend.svg';

import UserStats from "../page/user/userstats.component";

function ProfileModal(props: { user: i_user, onClose: () => void })
{
	const { username } = useContext(AuthContext);
	const [friend, setFriend] = useState(false);

	const link_to_profile = "/user/" + props.user.name

	return (
		<div className='modal--profile'>
			<div className='modal--profile--top--icon'>
				<Link to={link_to_profile}>
					<ProfilePage />
				</Link>
				{!friend ? (
					<button onClick={() => setFriend(true)}>
						<AddFriend />
					</button>
				) : (
					<button onClick={() => setFriend(false)}>
						<RemoveFriend />
					</button>
				)}
			</div>
			<div>
				<img className='img' style={{ marginTop: "-3rem", height: "30vh", width: "30vh" }} src={props.user.profilePicPath} alt="profile" />
				{friend && <Heart className='heart' onClick={() => setFriend(false)} />}
			</div>
			<div>
				<h2 className='truncate' style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>{props.user.name}</h2>
			</div>
			<div className='card card--alt' style={{ height: "22vh" }}>
				<UserStats user={props.user} />
			</div>
			<div>
				{username !== props.user.name && <input className='card card--input' type='text' placeholder=' 💬' />}
			</div>
		</div >
	);
}

export default ProfileModal;