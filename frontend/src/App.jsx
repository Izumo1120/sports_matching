import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from "./components/pages/Home";
import Recruit from "./components/pages/Recruit";
import Confirm from "./components/pages/Confirm";
import Guest from "./components/pages/Guest";
import Details from "./components/pages/Details";

import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
