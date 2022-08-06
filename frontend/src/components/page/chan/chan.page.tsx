import '../../../style/chan.css';

import i_user from '../../../interface/user.interface';
import i_chan from '../../../interface/chan.interface';

import Chans from './chan.component';

function ChanPage() {
	let users: i_user[] = [];
	let chans: i_chan[] = [];

	users.push({ name: "glaverdu" });
	users.push({ name: "idhiba" });
	users.push({ name: "adelille", elo: 1200, win: 42, lose: 21, xp: 312, profilePicPath: "profile_picture/adelille.png" });
	users.push({ name: "yuva" });
	users.push({ name: "very_long_text_very_long_text_very_long_text_very_long_text", profilePicPath: "profile_picture/default.png" });

	users[0].profilePicPath = "profile_picture/default.png";
	users[1].profilePicPath = "profile_picture/default.png";

	chans.push({ name: "global" });
	chans.push({ name: "this is a channel name" });
	chans.push({ name: "another channel" });
	chans.push({ name: "adding a lot of channel:" });

	for (let i = 0; i < 42; i++) {
		chans.push({ name: i.toString() });
	}

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
