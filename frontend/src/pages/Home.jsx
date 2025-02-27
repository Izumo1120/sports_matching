import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Container } from '@mui/material';
import "./Home.css";



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
                <Typography variant="h4" gutterBottom>
                    サービス紹介
                </Typography>
                <Typography paragraph>
                    このサービスでは、あなたのスポーツイベントを簡単に作成し、参加者を募ることができます。イベントの日程、参加人数、スポーツの種類を選んで、参加者を集めましょう。
                </Typography>
            </Box>

            {/* 募集ボタン・参加ボタン */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, my: 4 }}>
                <Button variant="contained" color="primary" size="large" href="/recruit">
                    募集を作成
                </Button>
                <Button variant="outlined" color="secondary" size="large" href="/guest">
                    参加する
                </Button>
            </Box>
        </Container>
    );
};

export default Home;
