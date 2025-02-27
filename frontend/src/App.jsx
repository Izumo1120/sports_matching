import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"; // useLocationをインポート

import Home from "./pages/Home";
import Login from "./pages/Login";
import Recruit from "./pages/Recruit";
import Apply from "./pages/Apply";
import Confirm from "./pages/Confirm";
import Guest from "./pages/Guest";
import Details from "./pages/Details";
import ManagementEvent from "./pages/ManagementEvent";
import PostDetails from "./pages/PostDetails";
import ApplyConfirm from "./pages/ApplyConfirm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router>
      <Box sx={{ minHeight: "100vh" }}>
        <AppContent isAuth={isAuth} setIsAuth={setIsAuth} />
      </Box>
    </Router>
  );
}

const AppContent = ({ isAuth, setIsAuth }) => {
  const location = useLocation(); // 現在のURLパスを取得

  return (
    <>
      {/* ログイン画面以外でNavbarとFooterを表示 */}
      {location.pathname !== "/login" && (
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
      )}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/recruit" element={<Recruit />} />
        <Route path="/post/:id/apply" element={<Apply />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/guest" element={<Guest />} />
        <Route path="/details" element={<Details />} />
        <Route path="/managementevent" element={<ManagementEvent />} />
        <Route path="/post/:id/applyconfirm" element={<ApplyConfirm />} />
        <Route path="/post/:id" element={<PostDetails />} />{" "}
        {/* 投稿詳細ページ */}
      </Routes>
      {/* ログイン画面以外でFooterを表示 */}
      {location.pathname !== "/login" && <Footer />}
    </>
  );
};

export default App;
