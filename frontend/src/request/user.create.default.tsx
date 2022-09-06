import axios from 'axios';
import { useContext } from 'react';

import { ApiUrlContext } from '../context/apiUrl.context';

import { useReqUsers } from './user.request';

import Error from '../components/request_answer_component/error.component';
import Loading from '../components/request_answer_component/loading.component';

function CreateDefaultUser()
{
	const { apiUrl } = useContext(ApiUrlContext);
	const { reqUsers, loading, error } = useReqUsers();

	if (loading)
		return (<Loading />);
	else if (error)
		return (<Error msg={error.message} />);
	else if (reqUsers.length > 0)
		return (<div />);

	axios.get(apiUrl + "/user/init").catch(err =>
	{
		console.log(err);
	});

	return (<div />);
}

export default CreateDefaultUser;