import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client'

import { InitChan, useReqChans } from '../../../request/chan.request';
import { useReqUsers } from '../../../request/user.request';

import '../../../style/chan.css';

import i_chan from '../../../interface/chan.interface';

import { AuthContext } from '../../../context/auth.context';
import { ApiUrlContext } from '../../../context/apiUrl.context';

import Chans from './chan.component';
import Loading from '../../request_answer_component/loading.component';
import Error from '../../request_answer_component/error.component';
import i_user from '../../../interface/user.interface';

function ChanReq(props: {
	socket: Socket, chans: i_chan[] | null, users: i_user[] | null,
	to_chan: number, callback: (newId: number, oldId: number) => void
})
{
	const reqChans = useReqChans();
	const reqUsers = useReqUsers();

	if (reqChans.loading || reqUsers.loading)
		return (<div className='back'><Loading /></div>);
	else if (reqChans.error)
		return (<div className='back'><Error msg={reqChans.error.message} /></div>);
	else if (reqUsers.error)
		return (<div className='back'><Error msg={reqUsers.error.message} /></div>);
	else
	{
		return (
			<div>
				{reqChans.reqChans.length === 0 ? (
					<InitChan />
				) : (
					<div>
						<Chans socket={props.socket}
							chans={(props.chans ? props.chans : reqChans.reqChans)}
							users={(props.users ? props.users : reqUsers.reqUsers)}
							to_chan={props.to_chan} callback={props.callback} />
					</div>
				)}
			</div>
		);
	}
}

function ChanPage()
{
	const { apiUrl } = useContext(ApiUrlContext);
	const { user, setUser } = useContext(AuthContext);
	const [selectedChan, setSelectedChan] = useState(1);
	const [chans, setChans] = useState<i_chan[] | null>(null);
	const [users, setUsers] = useState<i_user[] | null>(null);
	const [socket] = useState(io(apiUrl + "/chat"));

	useEffect(() =>
	{
		socket.on('newClient', (data: { userId: number }) =>
		{
			console.log("newClient", data);
			callback(selectedChan, selectedChan);
		});
		socket.emit('newConnection');
		socket.emit('joinRoom', selectedChan);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	console.log(socket);

	function callback(newId: number, oldId: number)
	{
		if (!user || !user.id)
			return;

		axios.put(apiUrl + "/chan/join/" + newId.toString(), { userId: user.id }).then(res =>
		{
			socket.emit('leaveRoom', oldId.toString());
			socket.emit('joinRoom', newId.toString());

			axios.get(apiUrl + "/chan/").then(chans =>
			{
				axios.get(apiUrl + "/user/" + user.id).then(user =>
				{
					axios.get(apiUrl + "/user/").then(users =>
					{
						setChans(chans.data);
						setSelectedChan(newId);
						setUser(user.data);
						setUsers(users.data);
					}).catch(err => console.log(err));
				}).catch(err => console.log(err));
			}).catch(err => console.log(err));
		}).catch(err => console.log(err));
	}

	return (<ChanReq socket={socket} chans={chans} users={users} to_chan={selectedChan} callback={callback} />);
}

export default ChanPage;
