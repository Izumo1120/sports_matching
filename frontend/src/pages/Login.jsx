import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";  // Googleアイコンの使用

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const loginInWithGoogle = () => {
    // Googleログイン
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" component="h1" gutterBottom>
            ログインして始める
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={loginInWithGoogle}
            sx={{ marginTop: 2 }}
          >
            Googleでログイン
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
