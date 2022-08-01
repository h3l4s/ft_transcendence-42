import { useContext } from "react";

import "../../style/chan.css"

import { AuthContext } from "../../context/auth.context";

import i_user from "../../interface/user.interface";

import UserStats from "../page/user/userstats.component";

function ProfileModal(props: { user: i_user, onClose: () => void })
{
	const { username } = useContext(AuthContext);

	return (
		<div className='modal--profile'>
			<div>
				<img className='img' style={{ height: "30vh", width: "30vh" }} src={props.user.profilePicPath} alt="profile" />
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