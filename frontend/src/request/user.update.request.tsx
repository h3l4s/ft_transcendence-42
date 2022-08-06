import { useContext, useEffect } from "react";
import axios from "axios";

import useFetch from "./useFetch";
import { useReqUser } from "./user.request";

import { AuthContext } from "../context/auth.context";

import i_user from "../interface/user.interface";

async function reqUpdate(url: string, type: 'put' | 'post' | 'delete', payload?: any)
{
	let user: i_user | null = null;

	const update_answer = await (type === 'post' ? axios.post(url, payload)
		: (type === 'put' ? axios.put(url, payload)
			: (axios.delete(url, payload))));
	console.log(update_answer);

	return (user);
}

function reqUpdateUser(
	user: i_user | null,
	setUser: React.Dispatch<React.SetStateAction<i_user | null>>,
	url: string,
	type: 'put' | 'post' | 'delete',
	payload?: any)
{
	reqUpdate(url, type, payload).then((reqUser) =>
	{ setUser(reqUser); })
}

export default reqUpdateUser;
