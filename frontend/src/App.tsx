import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './style/root.css'
import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import i_user from './interface/user.interface';

import { AuthContext } from './context/auth.context';
import { ApiUrlContext } from './context/apiUrl.context';

import NavBar from './components/navbar.component';
import NoMatch from './components/page/nomatch.page';
import RequireAuth from './components/requireAuth.component';

import Home from './components/page/home.page';
import ChanPage from './components/page/chan/chan.page';
import UserPage from './components/page/user/user.page';
import PongPage from './components/page/pong/pong.page';
import CreateDefaultUser from './request/user.create.default';
import LoginPage from './components/page/login/login.page';
import ConnectPage from './components/page/login/connect.page';
import ChallengePage from './components/page/pong/challenge.page';
import PongView from './components/page/pong/pong.view';
import axios from 'axios';

function App()
{
	const [user, setUser] = useState<i_user | null>(null);
	const [apiUrl, setApiUrl] = useState("http://" + window.location.hostname + ":3000");

	const valueUser = useMemo(() => ({ user, setUser }), [user, setUser]);
	const valueApiUrl = useMemo(() => ({ apiUrl, setApiUrl }), [apiUrl, setApiUrl]);

	if (!user && localStorage.getItem("user"))
	{
		const JWT_user = JSON.parse(localStorage.getItem("user") as string);
		console.info("JWT user:", JWT_user);
		axios.get(apiUrl + "/user/" + JWT_user.id).then(res => setUser(res.data)).catch(err => console.log(err));
	}
	else if (user)
		console.info("connected:", user);
	else
		console.info("not connected");

	return (
		<Router>
			<NavBar />
			<ApiUrlContext.Provider value={valueApiUrl}>
				<AuthContext.Provider value={valueUser}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/view/:id" element={<RequireAuth><PongView goBack={() => { }} /></RequireAuth>} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/connect/:token" element={<ConnectPage />} />
						<Route path="/play" element={<RequireAuth><PongPage /></RequireAuth>} />
						<Route path="/challenge/:id" element={<RequireAuth><ChallengePage /></RequireAuth>} />
						<Route path="/chan" element={<RequireAuth><ChanPage /></RequireAuth>} />
						<Route path="/user" element={<RequireAuth><UserPage /></RequireAuth>} />
						<Route path="/user/:username" element={<UserPage />} />
						<Route path="*" element={<NoMatch />} />
					</Routes>
				</AuthContext.Provider>
			</ApiUrlContext.Provider>
			<CreateDefaultUser />
		</Router>
	);
}

export default App;
