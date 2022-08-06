import { useEffect, useState } from "react";
import axios from "axios";

import i_user from "../interface/user.interface"

function useFetch(url: string, type: ('get' | 'post' | 'put' | 'delete'), payload?: any)
{
	const [error, setError] = useState<{ message: string } | null>(null);
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(null);

	useEffect(() =>
	{
		const answer = (type === 'get' ? axios.get(url, payload)
			: (type === 'post' ? axios.post(url, payload)
				: (type === 'put' ? axios.put(url, payload)
					: (axios.delete(url, payload)))));
		answer.then(
			(res) =>
			{
				setLoading(false);
				setData(res.data);
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) =>
			{
				setLoading(false);
				setError(error);
			}
		)
	})

	return ({ data, loading, error });
}

function userBacktoFront(user: any)
{
	const ret_user: i_user = (user ? {
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
	} : {});

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

function useReqUser(query: number | string)
{
	const { data, loading, error } = useFetch(
		"http://localhost:3000/user/" + (typeof query === 'number' ? query : "name/" + query), 'get');

	const reqUser: i_user = userBacktoFront(data);
	return ({ reqUser, loading, error });
}

export { useFetch, userBacktoFront, requestUser, requestUserByName, useReqUser };
