import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signOut } from "firebase/auth";
import "./Navbar.css"; // スタイル用のCSSファイルを作成

//アイコン
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

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
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="navbar-title">
            SAGAスポーツマッチング
          </Link>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-auth">
          <Link to="/recruit" className="nav-link">
            <GroupAddIcon />
            募集する
          </Link>
          <Link to="/guest" className="nav-link">
            <ManageSearchIcon />
            参加する
          </Link>
          {!isAuth ? (
            <Link to="/login" className="nav-link">
              <LoginIcon />
              ログイン
            </Link>
          ) : (
            <button className="nav-button" onClick={logout}>
              <LogoutIcon />
              ログアウト
            </button>
          )}
          <div className="hamburger-container">
            <div className="hamburger"></div>
            <div className="hamburger"></div>
            <div className="hamburger"></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
