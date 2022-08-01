import { useContext } from 'react';
import { useParams } from 'react-router-dom';

import '../../../style/user.page.css';

import i_user from '../../../interface/user.interface';

import { AuthContext } from '../../../context/auth.context';

function UserPage()
{
	const { username, setUsername } = useContext(AuthContext);

	const params = useParams();
	const username_to_show = (!params.username ? username : params.username);

	// need to check if user exist in db

	return (
		<div style={{ position: "relative", backgroundColor: "#96c471", color: "#fff", textAlign: "center", paddingTop: "5rem" }}>
			{username_to_show}
			<div style={{ color: "red" }}>🚧 WIP 🚧</div>
		</div>
	);
}

export default UserPage;
