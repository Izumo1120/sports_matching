import { Link } from "react-router-dom";
import "./Navbar.css"; // スタイル用のCSSファイルを作成

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
          募集する
        </Link>
        <Link to="/guest" className="nav-link">
          参加する
        </Link>
        <Link to="/signup" className="nav-link">
          新規登録
        </Link>
        <Link to="/login" className="nav-link">
          ログイン
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
