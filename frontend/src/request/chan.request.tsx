import i_chan from "../interface/chan.interface";

import useFetch from "./useFetch";

function chanBacktoFront(chan: any)
{
	const ret_chan: i_chan = (chan ? {
		id: chan.id,
		name: chan.name,
		usersId: chan.usersId,
		ownerId: chan.ownerId,
		adminsId: chan.adminsId,
		type: chan.type,
		// msg
	} : {});

	return (ret_chan);
}

function useReqChan(query: number | string)
{
	const { data, loading, error } = useFetch(
		"http://localhost:3000/chan/" + (typeof query === 'number' ? query : "name/" + query), 'get');

	const reqChan: i_chan = chanBacktoFront(data);
	return ({ reqChan, loading, error });
}

function useReqChans()
{
	const { data, loading, error } = useFetch("http://localhost:3000/chan/", 'get');
	let reqChans: i_chan[] = [];

	if (!loading && !error && data)
		for (let i = 0; i < data.length; i++)
			reqChans.push(chanBacktoFront(data[i]));
	return ({ reqChans, loading, error });
}

export { chanBacktoFront, useReqChan, useReqChans }