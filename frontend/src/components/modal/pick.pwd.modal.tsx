function PickPwdModal(props: { onClose: () => void })
{
	return (
		<div onMouseLeave={props.onClose} className='modal--option'>
			options
		</div>
	);
}

export default PickPwdModal;
