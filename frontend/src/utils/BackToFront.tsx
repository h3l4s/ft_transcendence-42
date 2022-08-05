import i_user from "../interface/user.interface"

function userBacktoFront(user: any) {
	const ret_user: i_user = {
		id: user.id,
		access_token: user.access_token,
		name: user.name,
		// profile pic
		profilePicPath: "profile_picture/default.png",
		xp: user.xp,
		elo: user.elo,
		win: user.win,
		lose: user.lose
	};

	return (ret_user);
}

export default userBacktoFront;
