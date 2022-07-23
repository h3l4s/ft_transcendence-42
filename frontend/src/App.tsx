import React from 'react'
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import SignUp from './components/signup.component'

function App() {
  return (
  <SignUp />
  )
}

export default App
