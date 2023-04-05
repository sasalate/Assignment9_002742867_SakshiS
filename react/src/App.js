import logo from './logo.svg';
import './App.css';
import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Jobs from './pages/Jobs';
import Login from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route path="/Contact" element={<Contact />}></Route>
        <Route path="/Jobs" element={<Jobs />}></Route>
      </Routes>

      {/* <Navbar/> */}

      {/* <Login/> */}
    </Router>
  );
}

export default App;