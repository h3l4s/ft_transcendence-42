import { useContext, useMemo, useState } from 'react';

import { InitChan, useReqChans } from '../../../request/chan.request';
import { useReqUsers } from '../../../request/user.request';

import '../../../style/chan.css';

import { ChanContext } from '../../../context/chan.context';

import Chans from './chan.component';
import Loading from '../../request_answer_component/loading.component';
import Error from '../../request_answer_component/error.component';

function ChanPage()
{
	const reqChans = useReqChans();
	const reqUsers = useReqUsers();
	const context = useContext(ChanContext);
	const [selectedChan, setSelectedChan] = useState(1);
	const value = useMemo(() => ({ selectedChan, setSelectedChan }), [selectedChan, setSelectedChan]);


	if (reqChans.loading || reqUsers.loading)
		return (<div className='back'><Loading /></div>);
	else if (reqChans.error)
		return (<div className='back'><Error msg={reqChans.error.message} /></div>);
	else if (reqUsers.error)
		return (<div className='back'><Error msg={reqUsers.error.message} /></div>);
	else
	{
		return (
			<ChanContext.Provider value={value}>
				<div>
					{reqChans.reqChans.length === 0 ? (
						<InitChan />
					) : (
						<div>
							<Chans chans={reqChans.reqChans} users={reqUsers.reqUsers} to_chan={context.selectedChan} />
						</div>
					)}
				</div>
			</ChanContext.Provider>
		);
	}
}

export default ChanPage;
