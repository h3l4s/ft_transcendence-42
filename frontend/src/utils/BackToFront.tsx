import axios from "axios";

import i_user from "../interface/user.interface"

function userBacktoFront(user: any)
{
	const ret_user: i_user = {
		id: user.id,
		access_token: user.access_token,
		name: user.name,
		// profile pic
		profilePicPath: "profile_picture/default.png",
		xp: user.xp,
		elo: user.elo,
		win: user.win,
		lose: user.lose,
		matchHistory: user.matchHistory,
		friendsId: user.friendsId
	};

	return (ret_user);
}

async function requestUser(id: number): Promise<i_user | null>
{
	let user: i_user | null = null;

	await axios.get("http://localhost:3000/user/" + id).then(res =>
	{
		console.log(res);
		user = userBacktoFront(res.data);
	}).catch(err =>
	{
		console.log(err);
	});

	return (user);
}

async function requestUserByName(name: string): Promise<i_user | null>
{
	let user: i_user | null = null;

	await axios.get("http://localhost:3000/user/name/" + name).then(res =>
	{
		console.log(res);
		user = userBacktoFront(res.data);
	}).catch(err =>
	{
		console.log(err);
	});

	return (user);
}

export { userBacktoFront, requestUser, requestUserByName };
