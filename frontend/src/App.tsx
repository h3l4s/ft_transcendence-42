import React from 'react';
import './style/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import SignUp from './components/signup.component';
import ChanPage from './components/chan/chan.page';

function App()
{
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SignUp />} />
				<Route path="/chan" element={<ChanPage connected_user={{ name: "adelille" }} /*need to handle if is signup and update connected_user*/ />} />
			</Routes>
		</Router >
	);
}

export default App;
