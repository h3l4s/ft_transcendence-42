import { InitChan, useReqChans } from '../../../request/chan.request';
import { useReqUsers } from '../../../request/user.request';

import '../../../style/chan.css';

import Chans from './chan.component';
import Loading from '../../request_answer_component/loading.component';
import Error from '../../request_answer_component/error.component';

function ChanPage()
{
	const reqChans = useReqChans();
	const reqUsers = useReqUsers();

	if (reqChans.loading || reqUsers.loading)
		return (<Loading />);
	else if (reqChans.error)
		return (<Error msg={reqChans.error.message} />);
	else if (reqUsers.error)
		return (<Error msg={reqUsers.error.message} />);
	else
	{
		return (
			<div>
				{reqChans.reqChans.length === 0 && <InitChan />}
				<div className='split split--chan split--left'>
					<div className='split--left--div' /*this style doesn't exist*/>
						<Chans chans={reqChans.reqChans} users={reqUsers.reqUsers} />
					</div>
				</div >
			</div>
		);
	}
}

export default ChanPage;
