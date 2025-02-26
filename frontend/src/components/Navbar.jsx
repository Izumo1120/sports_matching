import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom"; // リンクに使います

const Navbar = () => {
    return (
        <AppBar position="sticky" color="primary">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* サービス名（左揃え） */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    SAGAスポーツマッチング
                </Typography>

                {/* 募集ボタン、参加ボタン（中央揃え） */}
                <Box sx={{ display: "flex", gap: 3 }}>
                    <Button color="inherit" component={Link} to="/recruit">
                        募集
                    </Button>
                    <Button color="inherit" component={Link} to="/guest">
                        参加
                    </Button>
                </Box>

                {/* 新規登録・ログインボタン（右揃え） */}
                <Box>
                    <Button color="inherit" component={Link} to="/signup">
                        新規登録
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                        ログイン
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
