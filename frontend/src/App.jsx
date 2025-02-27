import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Recruit from "./pages/Recruit";
import Confirm from "./pages/Confirm";
import Guest from "./pages/Guest";
import Details from "./pages/Details";
import ManagementEvent from "./pages/ManagementEvent";
import ApplyDetails from "./pages/ApplyDetails";
import RecruitDetail from "./pages/RecruitDetail";

import Navbar from "./components/Navbar";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/details" element={<Details />} />
        <Route path="/managementevent" element={<ManagementEvent />} />
        <Route path="/recruitdetail" element={<RecruitDetail />} />
        <Route path="/applydetails" element={<ApplyDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
