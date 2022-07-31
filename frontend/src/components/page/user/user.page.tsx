import { useParams } from 'react-router-dom';

import '../../../style/profile.css';

import i_user from '../../../interface/user.interface';

function UserPage(props: { connected_user: i_user })
{
	const params = useParams();
	const username = (!params.username ? props.connected_user.name : params.username);

	// need to check if user exist in db

	return (
		<div style={{ color: "#fff", textAlign: "center", marginTop: "5rem" }}>
			{username}
			<div style={{ color: "red" }}>🚧 WIP 🚧</div>
		</div>
	);
}

export default UserPage;
