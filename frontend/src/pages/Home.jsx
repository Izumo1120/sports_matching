import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, Box, Container } from "@mui/material";
import "./Home.css";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ChecklistIcon from "@mui/icons-material/Checklist";

const images = [
  "/header1.jpg",
  "/header2.jpg",
  "/header3.jpg",
  "/header4.jpg",
  "/header5.jpg",
];

const Home = ({ isAuth }) => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevImage(currentImage); // 現在の画像を prevImage に保存
      setCurrentImage((prev) => (prev + 1) % images.length); // 次の画像に切り替え
      setAnimate(true); // アニメーション開始

      setTimeout(() => {
        setAnimate(false); // アニメーション終了
        setPrevImage(null); // 古い画像をリセット
      }, 800); // アニメーション時間と同期
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage]);

  const handleButtonClick = (link) => {
    if (isAuth) {
      navigate(link);
    } else {
      navigate("/login");
    }
  };

  return (
    <Container disableGutters maxWidth={false} className="container">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 7,
          position: "relative",
          width: "100%",
          minHeight: "450px",
          overflow: "hidden",
        }}
      >
        {/* スライドアウトする現在の画像 */}
        {prevImage !== null && (
          <img
            src={images[prevImage]}
            alt="スポーツイベント"
            className={`slide-image slide-out`}
          />
        )}

        {/* スライドインする次の画像 */}
        <img
          src={images[currentImage]}
          alt="スポーツイベント"
          className={`slide-image ${animate ? "slide-in" : ""}`}
        />
      </Box>

      <Box className="center-box">
        <h2>スポーツマッチングアプリ - 佐賀県で仲間を見つけよう！</h2>
        <p className="description">
          佐賀県でチームスポーツを楽しみたいけど、メンバーが足りない…
          <br />
          そんなときに頼れるのが「スポーツマッチングアプリ」です！
          <br />
          このアプリは、あなたのスポーツイベントに必要な人数を募るための便利なツール。
          <br />
          シンプルで使いやすいインターフェースを通じて、参加者を迅速に集めることができます。
        </p>
      </Box>

      <Box className="center-box">
        <h2>こんなときに使える！</h2>
        <p className="description">
          バスケットボールやサッカー、フットサルなど、チームスポーツでメンバーが足りないとき
          <br />
          急なメンバー不足でも、地域のスポーツ好きと簡単にマッチング
          <br />
          新しい仲間を作りたい、活動の幅を広げたい人にぴったり
        </p>
      </Box>

      <Box className="center-box">
        <h2>スポーツ仲間を探してみよう！</h2>
      </Box>

      <Container sx={{ mt: 4, mb: 4 }}>
        <Box className="button-box">
          <Button
            className="button"
            sx={{ borderRadius: "8px", width: 150, height: 150 }}
            onClick={() => handleButtonClick("/recruit")}
          >
            <GroupAddIcon sx={{ fontSize: 80 }} />
            <h3>募集する</h3>
          </Button>
          <Button
            className="button"
            sx={{ borderRadius: "8px", width: 150, height: 150 }}
            onClick={() => handleButtonClick("/guest")}
          >
            <ManageSearchIcon sx={{ fontSize: 80 }} />
            <h3>参加する</h3>
          </Button>
          <Button
            className="button"
            sx={{ borderRadius: "8px", width: 150, height: 150 }}
            onClick={() => handleButtonClick("/managementevent")}
          >
            <ChecklistIcon sx={{ fontSize: 80 }} />
            <h3>イベント管理</h3>
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default Home;
