import { useState } from "react";
import { Navigate } from "react-router-dom";

import useFetch from "../../request/useFetch";
import sleep from "../../utils/sleep";
import Error from "../request_answer_component/error.component";

import Loading from "../request_answer_component/loading.component";

function SumbitAddChan(props: {
	user_id: number,
	name: string,
	type: 'public' | 'private' | 'protected',
	pwd: string,
	onClose: () => void
})
{
	const { data, loading, error } = useFetch("http://localhost:3000/chan", 'post', {
		name: props.name,
		ownerId: props.user_id,
		usersId: [props.user_id],
		type: props.type,
		hash: props.pwd
	})

	if (loading)
		return (<div style={{ textAlign: "center" }}><Loading /></div>);
	else if (error)
		return (<div style={{ textAlign: "center" }}><Error msg={error.message} /></div>);
	else
	{
		console.log(data);
		props.onClose();
		//sleep(500);
		return (<Navigate to={"/chan/" + data.id} />);
	}
}

function AddChanModal(props: { user_id: number, onClose: () => void })
{
	const [title, setTitle] = useState("");
	const [type, setType] = useState<'public' | 'private' | 'protected'>('public');
	const [pwd, setPwd] = useState("");
	const [sumbit, setSubmit] = useState(false);

	function handleSubmit(event: any)
	{
		console.log(event.target.value);
		console.log(event);
		console.log("title: ", title);
		console.log("type: ", type);
		setSubmit(true);
		event.preventDefault();
	}

	return (
		<form className='modal--add--chan' onSubmit={handleSubmit}>
			<label>title</label>
			<input type='text' required value={title} onChange={(e) => { setTitle(e.target.value) }} />
			< div >
				<button type='button' onClick={() => setType('public')}>public</button>
				<button type='button' onClick={() => setType('private')}>private</button>
				<button type='button' onClick={() => setType('protected')}>protected</button>
			</div>
			{
				type === 'protected'
				&& <div>
					<label>password</label>
					<input required type='text' value={pwd} onChange={(e) => { setPwd(e.target.value) }} />
				</div>
			}
			<input type='submit' value='sumbit' />
			{sumbit && <SumbitAddChan user_id={props.user_id} name={title} type={type} pwd={pwd} onClose={props.onClose} />}
		</form >
	);
}

export default AddChanModal;
