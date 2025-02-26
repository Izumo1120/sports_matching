import React from 'react';
import { Button, Box, Typography, Container, Grid } from '@mui/material';
import "./Home.css";

const Home = () => {
    return (
        <Container disableGutters maxWidth="false" className='container'>
            {/* ヘッダー */}
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h3" gutterBottom>
                    スポーツイベント募集
                </Typography>
                <Typography variant="h6">
                    あなたのスポーツイベントを簡単に作成し、参加者を募集しましょう！
                </Typography>
            </Box>

            {/* サービス紹介 */}
            <Box sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h5" gutterBottom>
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
