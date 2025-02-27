import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from "./pages/Home";
import Recruit from "./pages/Recruit";
import Confirm from "./pages/Confirm";
import Guest from "./pages/Guest";
import Details from "./pages/Details";
import ManagementEvent from "./pages/ManagementEvent";


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
        <Route path="/managementevent" element={<ManagementEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
