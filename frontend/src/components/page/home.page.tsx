import { Link } from "react-router-dom";

function Home()
{
	return (
		<div style={{ backgroundColor: "#96c471", color: "#fff", textAlign: "center", paddingTop: "5rem" }}>
			home page
			<div style={{ color: "red" }}>🚧 WIP 🚧</div>
			<br />
			<br />
			<br />
			<div style={{ paddingRight: "12rem" }}>
				<Link to='/login' className='btn'>login page</Link>
			</div>
		</div>
	);
}

export default Home;
