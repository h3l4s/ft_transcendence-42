import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import i_user from './interface/user.interface';

import NavBar from './components/navbar.component';
import NoMatch from './components/page/nomatch.page';
import SignUp from './components/signup.component';

import ChanPage from './components/page/chan/chan.page';
import UserPage from './components/page/user/user.page';

function App()
{
	const connected_user: i_user = { name: "adelille" };

	return (
		<Router>
			<NavBar />
			<Routes>
				<Route path="/" element={<SignUp />} />
				<Route path="/chan" element={<ChanPage connected_user={connected_user} /*need to handle if is signup and update connected_user*/ />} />
				<Route path="/user" element={<UserPage connected_user={connected_user} />} />
				<Route path="/user/:username" element={<UserPage connected_user={connected_user} />} />
				<Route path="*" element={<NoMatch />} />
			</Routes>
		</Router >
	);
}

export default App;
