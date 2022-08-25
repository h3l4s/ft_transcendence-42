import axios from "axios";
import { useState } from "react";

function PromptPwdModal(props: { chan_id: number | undefined, callback: () => void })
{
	const [pwd, setPwd] = useState("");
	const [wrongPwd, setWrongPwd] = useState(false);

	if (!props.chan_id)
		return (<div />);

	function pwdUpdateHandle(event: React.KeyboardEvent<HTMLInputElement>)
	{
		if (wrongPwd)
			setWrongPwd(false);
		setPwd(event.target.value);
	};

	function pwdSendHandle(event: React.KeyboardEvent<HTMLInputElement>)
	{
		if (event.key === 'Enter' && pwd.length > 0)
		{
			event.preventDefault();
			axios.post("http://localhost:3000/chan/pwd/" + props.chan_id, pwd).then((res) =>
			{
				console.log(res);
				console.log(res.data);
				if (res.data.valid === true)
					props.callback();
				else
					setWrongPwd(true);
			}).catch(err => console.log(err));
			setPwd("");
		}
	}

	return (
		<div className='modal--add--chan'>
			<input className='card--input input--chat' type='text' placeholder=' 💬'
				onChange={pwdUpdateHandle} value={pwd} onKeyDown={pwdSendHandle} />
		</div >
	);
}

export default PromptPwdModal;
