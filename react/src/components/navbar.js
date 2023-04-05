import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import './navbar.css';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';
import Jobs from '../pages/Jobs';


export default function Navbar(){
  return <nav className="nav">
    <a href="/" className="site-title"></a>
    <Link to="/Home">HOME</Link> {" "}
    <Link to="/AboutUs">ABOUT US</Link> {" "}
    <Link to="/Contact">CONTACT</Link> {" "}
    <Link to="/Jobs">JOBS</Link> {" "}
    <button class="btn btn-logout" onClick={logout}>LOGOUT</button>
    <Routes>
          <Route path="/Home" element={<Home />} ></Route>
          <Route path="/AboutUs" element={<AboutUs />} ></Route>
          <Route path="/Contact" element={<Contact />} ></Route>
          <Route path="/Jobs" element={<Jobs />} ></Route>
    </Routes>
</nav>
function logout(){
  localStorage.removeItem('token');
  window.location.href = "/";
}
}