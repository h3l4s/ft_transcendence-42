import { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { AuthContext } from './context/auth.context';

import NavBar from './components/navbar.component';
import NoMatch from './components/page/nomatch.page';
import RequireAuth from './components/requireAuth.component';

import Home from './components/page/home.page';
import SignUp from './components/page/login/signup.component';
import ChanPage from './components/page/chan/chan.page';
import UserPage from './components/page/user/user.page';

function App()
{
	const [username, setUsername] = useState<string | null>(null);

	const value = useMemo(() => ({ username, setUsername }), [username, setUsername]);

	return (
		<Router>
			<NavBar />
			<AuthContext.Provider value={value}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<SignUp />} />
					<Route path="/play" element={<RequireAuth><NoMatch /*need to put the pong page here*/ /></RequireAuth>} />
					<Route path="/chan" element={<RequireAuth><ChanPage /></RequireAuth> /*need to handle if is signup and update connected_user*/} />
					<Route path="/user" element={<RequireAuth><UserPage /></RequireAuth>} />
					<Route path="/user/:username" element={<UserPage />} />
					<Route path="*" element={<NoMatch />} />
				</Routes>
			</AuthContext.Provider>
		</Router >
	);
}

export default App;
