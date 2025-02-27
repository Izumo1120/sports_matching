import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, Paper, CircularProgress } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // ロード状態管理
  const [error, setError] = useState(null); // エラー管理

  const loginInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      setError("ログインに失敗しました。もう一度お試しください。");
      console.error("Googleログインエラー:", err);
    }
    setLoading(false);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f4f6f8", // 背景色
        }}
      >
        <nav className="navbar-m">
          <div className="navbar-brand">
            SAGAスポーツマッチング
          </div>
        </nav>
        <Container component="main" maxWidth="xs"
          sx={{ mt: 18 }}>
          <Paper
            elevation={5}
            sx={{
              height: 150,
              padding: 4,
              borderRadius: 3, // 角丸
              textAlign: "center",
            }}
          >
            <Typography variant="h5" color="black" gutterBottom={true} sx={{ fontWeight: 'bold' }}>
              外部サービスでログイン
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={loading ? <CircularProgress size={24} /> : <GoogleIcon />}
              onClick={loginInWithGoogle}
              sx={{
                textTransform: 'none',
                mt: 4,
                padding: "10px",
                width: '65%',
                "&:hover": {
                  backgroundColor: "#f8f8ff",
                },
              }}
            >
              {loading ? "ログイン中..." : "Googleでログイン"}
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Login;
