import { Link } from "react-router-dom";
import "./Navbar.css"; // スタイル用のCSSファイルを作成

//アイコン
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

const Navbar = () => {
  return (
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
        <Link to="/signup" className="nav-link">
          <PersonAddIcon />
          新規登録
        </Link>
        <Link to="/login" className="nav-link">
          <LoginIcon />
          ログイン
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
