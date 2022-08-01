import '../../../style/user.css'

import i_user from "../../../interface/user.interface";

function UserStats(props: { user: i_user })
{
	const w = (props.user.win ? props.user.win : 0)
	const l = (props.user.lose ? props.user.lose : 0)
	const rate = ((w / (w + l) * 100).toFixed(2));
	const rate_to_print = (rate === "NaN" ? "" : rate + "%");
	const elo = (props.user.elo ? props.user.elo : 0);
	const xp = (props.user.xp ? props.user.xp : 0);
	const level = Math.floor(Math.sqrt(xp / 4.2));
	const xp_next_level = Math.ceil(Math.pow((level + 1), 2) * 4.2);
	const xp_needed = xp_next_level - xp;

	return (
		<div className='parstats' style={{ fontSize: "small", marginTop: "0.5rem" }}>
			<div className='typewriter userstats'>
				<span>winrate:</span>
				<span>
					<span style={{ color: "#67c61a" }}>{w}</span>
					<span>|</span>
					<span style={{ color: "red" }}>{l}</span>
				</span>
				<span style={{ color: "#8888ff" }}>{rate_to_print}</span>
			</div>
			<div className='typewriter userstats' style={{ animationDelay: "0.75s" }}>
				<span>elo:</span>
				<span style={{ color: "var(--main-color-hover)" }}>{elo}</span>
			</div>
			<div className='typewriter userstats' style={{ animationDelay: "1.5s" }}>
				<span>level:</span>
				<span style={{ color: "var(--main-color-hover)" }}>{level}</span>
			</div>
			<div className='typewriter userstats' style={{ animationDelay: "2.25s" }}>
				<span>xp:</span>
				<span>
					<span style={{ color: "var(--main-color-hover)" }}>{xp}</span>
					<span>/</span>
					<span style={{ color: "#8888ff" }}>{xp_next_level}</span>
				</span>
			</div>
			<div className='typewriter userstats' style={{ animationDelay: "3s" }}>
				<span>↳</span>
				<span>
					<span>(</span>
					<span style={{ color: "greenyellow" }}>+</span>
					<span style={{ color: "#8888ff" }}>{xp_needed}</span>
					<span>)</span>
				</span>
			</div>
		</div>
	);
}

export default UserStats;
