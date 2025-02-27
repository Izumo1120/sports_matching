import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signOut } from "firebase/auth";
import { Button, Box, Container } from "@mui/material";
import "./Navbar.css"; // スタイル用のCSSファイルを作成

//アイコン
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';


const Navbar = ({ isAuth, setIsAuth }) => {
  const navigate = useNavigate();
  const logout = () => {
    //ログアウト
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/");
    });
  };
  const handleButtonClick = (link) => {
    if (isAuth) {
      navigate(link);
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="container">
      <nav className="navbar">
        <DensityMediumIcon sx={{ ml: '10%' }} />
        <div className="navbar-brand">
          <Link to="/" className="navbar-title">
            SAGAスポーツマッチング
          </Link>
        </div>
        <div className="navbar-auth">
          {!isAuth ? (
            <Link to="/login" className="nav-link">
              <LoginIcon />
              ログイン
            </Link>
          ) : (
            <>
              <button className="nav-link" onClick={() => handleButtonClick("/recruit")}>
                <GroupAddIcon />
                募集する
              </button>
              <button className="nav-link" onClick={() => handleButtonClick("/guest")}>
                <ManageSearchIcon />
                参加する
              </button>
              <button className="nav-link" onClick={() => handleButtonClick("/managementevent")}>
                <ChecklistIcon />
                イベント詳細
              </button>
              <button className="nav-link" onClick={logout}>
                <LogoutIcon />
                ログアウト
              </button>
            </>
          )}


        </div>
      </nav>
    </div>
  );
};

export default Navbar;
