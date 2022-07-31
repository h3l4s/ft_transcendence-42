import { useContext } from "react";

import "../../style/chan.css"

import { AuthContext } from "../../context/auth.context";

import i_user from "../../interface/user.interface";

function ProfileModal(props: { user: i_user, onClose: () => void })
{
	const { username } = useContext(AuthContext);

	const w = (props.user.win ? props.user.win : 0)
	const l = (props.user.lose ? props.user.lose : 0)
	const rate = ((w / (w + l) * 100).toFixed(2));
	const rate_to_print = (rate === "NaN" ? "" : rate + "%");

	return (
		<div className='modal--profile'>
			<div>
				<img className='img' style={{ height: "30vh", width: "30vh" }} src={props.user.profilePicPath} alt="profile" />
			</div>
			<div>
				<h2 className='truncate'>{props.user.name}</h2>
			</div>
			<div className='card card--alt' style={{ height: "22vh" }}>
				<p>
					<span>winrate:</span>
					<span style={{ color: "#67c61a", marginLeft: "1rem" }}> {w}</span>
					<span> | </span>
					<span style={{ color: "red" }}>{l} </span>
					<span style={{ color: "#8888ff", marginLeft: "1rem" }}>{rate_to_print}</span>
				</p>
			</div>
			<div>
				{username !== props.user.name && <input className='card card--input' type='text' placeholder=' 💬' />}
			</div>
		</div >
	);
}

export default ProfileModal;