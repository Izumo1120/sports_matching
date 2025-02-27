import React from "react";
import { Button, Box, Typography, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./ManagementEvent.css";

const ManagementEvent = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", mt: 5 }}>
                {/* タイトル */}
                <Typography variant="h4" component="h1" sx={{ color: "black", mb: 3 }}>
                    イベント管理ページ
                </Typography>

                {/* ボタンを縦に並べる */}
                <Stack spacing={2} direction="column" alignItems="center">
                    {/* 募集ボタン */}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ width: "200px" }}
                        onClick={() => navigate("/recruit")}
                    >
                        募集
                    </Button>

                    {/* 応募ボタン */}
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        sx={{ width: "200px" }}
                        onClick={() => navigate("/confirm")}
                    >
                        応募
                    </Button>
                    
                    {/* ホームへ戻るボタン */}
                    <Button 
                        variant="outlined" 
                        sx={{ width: "200px", mt: 2 }}
                        onClick={() => navigate("/")}
                    >
                        ホームに戻る
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};

export default ManagementEvent;
