import '../../../style/chan.css';

import i_user from '../../../interface/user.interface';
import i_chan from '../../../interface/chan.interface';

import Chans from './chan.component';

function ChanPage()
{
	let users: i_user[] = [];
	let chans: i_chan[] = [{ name: "global" }, { name: "this is a channel name" }, { name: "another channel" }];

	function addUser(user: i_user)
	{
		users.push(user);
	}

	addUser({ name: "glaverdu" });
	addUser({ name: "idhiba" });
	addUser({ name: "adelille", win: 42, lose: 21, profilePicPath: "profile_picture/adelille.png" });
	addUser({ name: "very_long_text_very_long_text_very_long_text_very_long_text", profilePicPath: "profile_picture/default.png" });

	users[0].profilePicPath = "profile_picture/default.png";
	users[1].profilePicPath = "profile_picture/default.png";

	return (
		<div>
			<div className='split split--chan split--left'>
				<div className='split--left--div' /*this style doesn't exist*/>
					<Chans chans={chans} users={users} />
				</div>
			</div >
		</div>
	);
}

export default ChanPage;
