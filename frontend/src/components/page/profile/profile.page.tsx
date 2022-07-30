import '../../../style/profile.css';

import i_user from '../../../interface/user.interface';

function ProfilePage(props: { connected_user: i_user })
{
	return (
		<div style={{ color: "#fff", textAlign: "center" }}>
			Profile
			<div style={{ color: "red" }}>🚧 WIP 🚧</div>
		</div>
	);
}

export default ProfilePage;
