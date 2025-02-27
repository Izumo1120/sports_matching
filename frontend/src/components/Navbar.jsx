import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signOut } from "firebase/auth";
import Tooltip from "@mui/material/Tooltip";
import "./Navbar.css"; // スタイル用のCSSファイルを作成

//アイコン
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AddIcon from '@mui/icons-material/Add';
import SmsIcon from '@mui/icons-material/Sms';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';


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
    <>
      <nav className="navbar-m">
        <div className="navbar-l">
          <div className="navbar-brand">
            <Link to="/" className="navbar-title">
              SAGAスポーツマッチング
            </Link>
          </div>
        </div>
        <div className="navbar-r">
          {!isAuth ? (
            <Tooltip title="ログイン">
              <Link to="/login" className="nav-link">
                <LoginIcon sx={{ fontSize: 40 }} />
              </Link>
            </Tooltip>
          ) : (
            <>
              <Tooltip title="チャット">
                <button className="nav-link">
                  <SmsIcon sx={{ fontSize: 35 }} />
                </button>
              </Tooltip>
              <Tooltip title="通知">
                <button className="nav-link">
                  <NotificationsIcon sx={{ fontSize: 35 }} />
                </button>
              </Tooltip>
              <Tooltip title="ログアウト">
                <button className="nav-link" onClick={logout}>
                  <LogoutIcon sx={{ fontSize: 35 }} />
                </button>
              </Tooltip>
            </>
          )}
        </div>
      </nav>
      <nav className="navbar-m2">
        {!isAuth ? (
          <></>
        ) : (
          <>
            <button className="nav-link2" onClick={() => handleButtonClick("/recruit")}>
              <GroupAddIcon sx={{ fontSize: 30, mr: '2%' }} />
              <div>募集する</div>
            </button>
            <button className="nav-link2" onClick={() => handleButtonClick("/guest")}>
              <ManageSearchIcon sx={{ fontSize: 30, mr: '2%' }} />
              <div>参加する</div>
            </button>
            <button className="nav-link2" onClick={() => handleButtonClick("/managementevent")}>
              <ChecklistIcon sx={{ fontSize: 30, mr: '2%' }} />
              <div>イベント詳細</div>
            </button>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
