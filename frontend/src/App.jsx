import React, { useState } from "react";
import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Recruit from "./pages/Recruit";
import Confirm from "./pages/Confirm";
import Guest from "./pages/Guest";
import Details from "./pages/Details";
import ManagementEvent from "./pages/ManagementEvent";

import Navbar from "./components/Navbar";
import Footer from './components/Footer';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <Box sx={{ minHeight: '100vh' }}>
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/guest" element={<Guest />} />
          <Route path="/details" element={<Details />} />
          <Route path="/managementevent" element={<ManagementEvent />} />
        </Routes>
      </Box>
      <Footer />
    </Router>
  );
}

export default App;
