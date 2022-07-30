import { useState } from "react";

import i_user from "../../interface/user.interface";
import i_chan from "../../interface/chan.interface";

function Chat(props: { obj: i_chan })
{
	return (
		<div className='card card--alt card--chat' >
			<div className='card chan--title truncate'>- {props.obj.name} -</div>
			<input className='card--input input--chat' type='text' placeholder=' 💬' />
		</div>
	);
}

export default Chat;
