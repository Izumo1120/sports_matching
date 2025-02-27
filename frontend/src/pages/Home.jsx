import React, { useState, useEffect } from 'react';
import { Button, Box, Container } from '@mui/material';
import "./Home.css";

//アイコン
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ChecklistIcon from '@mui/icons-material/Checklist';

const images = [
    "/header1.jpg",
    "/header2.jpg",
    "/header3.jpg",
    "/header4.jpg",
    "/header5.jpg"
];

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [prevImage, setPrevImage] = useState(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setPrevImage(currentImage);  // 現在の画像をprevImageに保存
            setAnimate(true);  // アニメーション開始

            setTimeout(() => {
                setCurrentImage((prev) => (prev + 1) % images.length); // 次の画像に切り替え
                setAnimate(false); // アニメーション終了
                setPrevImage(null); // 古い画像を消去
            }, 800); // アニメーション時間と同期
        }, 3000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <Container disableGutters maxWidth={false} className='container'>
            {/* ヘッダー */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                mb: 3,
                position: 'relative',
                width: '100%',
                minHeight: '450px', // 画像エリアを確保
                overflow: 'hidden'  // アニメーション時に画像がはみ出ないように
            }}>
                {/* 現在の画像 */}
                <img
                    src={images[currentImage]}
                    alt="スポーツイベント"
                    className="slide-image"
                />

                {/* スライドしてくる次の画像 */}
                {prevImage !== null && (
                    <img
                        src={images[(currentImage + 1) % images.length]}
                        alt="スポーツイベント"
                        className={`slide-image slide-in`}
                    />
                )}
            </Box>

            {/* サービス紹介 */}
            <Box className="center-box">
                <h2>
                    スポーツマッチングアプリ - 佐賀県で仲間を見つけよう！
                </h2>
                <p className="description">
                    佐賀県でチームスポーツを楽しみたいけど、メンバーが足りない…<br />
                    そんなときに頼れるのが「スポーツマッチングアプリ」です！<br />
                    このアプリは、あなたのスポーツイベントに必要な人数を募るための便利なツール。<br />
                    シンプルで使いやすいインターフェースを通じて、参加者を迅速に集めることができます。
                </p>
            </Box>

            <Box className="center-box">
                <h2>
                    こんなときに使える！
                </h2>
                <p className="description">
                    バスケットボールやサッカー、フットサルなど、チームスポーツでメンバーが足りないとき<br />
                    急なメンバー不足でも、地域のスポーツ好きと簡単にマッチング<br />
                    新しい仲間を作りたい、活動の幅を広げたい人にぴったり
                </p>
            </Box>
            <Container>
                <Box className="button-box">
                    <Button className="button">
                        <GroupAddIcon sx={{ fontSize: 50 }} />
                        <p>参加者募集</p>
                    </Button>
                    <Button className="button">
                        <ManageSearchIcon sx={{ fontSize: 50 }} />
                        <p>募集を探す</p>
                    </Button>
                    <Button className="button">
                        <ChecklistIcon sx={{ fontSize: 50 }} />
                        <p>イベント管理</p>
                    </Button>
                </Box>
            </Container>
        </Container>
    );
};

export default Home;
