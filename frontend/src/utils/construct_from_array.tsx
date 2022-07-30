function ConstructFromArray(props: { objs: any, av?: any, Constructor: (props: { av?: any, obj: any }) => JSX.Element })
{
	let ret: JSX.Element[] = [];

	for (let i = 0; i < Object.keys(props.objs).length; i++)
	{ ret.push(<props.Constructor av={props.av} obj={props.objs[i]} />); }

	return (
		<div>
			{ret};
		</div>
	);
}

export default ConstructFromArray;
