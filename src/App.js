import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

/**
 * ?  =====Import Components=====
 */
 import Home from './Pages/Home';
 import Signup from './Pages/Signup';
 import Login from './Pages/Login';

function App() {
  return (
    <div>
      <Router>
        <Routes>
        <Route exact element={<Home />} path="/" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Login />} path="/login" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
