import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";  // Firebase Auth をインポート
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ManagementEvent = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [postList, setPostList] = useState([]);
    const [userId, setUserId] = useState(null);  // 現在のユーザーID
    const navigate = useNavigate();
    const auth = getAuth(); // 認証情報を取得

    useEffect(() => {
        // 現在のユーザーを取得
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe(); // クリーンアップ
    }, [auth]);

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(collection(db, "events"));
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPosts();
    }, []);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    イベント管理ページ
                </Typography>

                <Tabs 
                    value={selectedTab} 
                    onChange={handleChange} 
                    centered
                    sx={{
                        "& .MuiTabs-indicator": { backgroundColor: "#1DA1F2" },
                        "& .MuiTab-root": { fontSize: "16px", fontWeight: "bold", textTransform: "none" },
                        "& .Mui-selected": { color: "#1DA1F2" }
                    }}
                >
                    <Tab label="募集" />
                    <Tab label="応募" />
                </Tabs>

                <Box sx={{ mt: 3 }}>
                    {/* 募集タブ */}
                    {selectedTab === 0 && postList
                        .filter(post => post.author?.id === userId) // 現在のユーザーが投稿したもののみ表示
                        .map((post) => (
                            <Box
                                key={post.id}
                                p={2}
                                boxShadow={2}
                                borderRadius={2}
                                mb={2}
                                bgcolor="white"
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { boxShadow: 5 },
                                    transition: "0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2
                                }}
                                onClick={() => navigate("/detail", { state: post })}
                            >
                                <img src="/waiting.jpeg" alt="Waiting" style={{ width: "50px", height: "50px", borderRadius: "8px" }} />
                                <Box>
                                    <Typography><strong>スポーツ:</strong> {post.sport}</Typography>
                                    <Typography><strong>募集人数:</strong> {post.people} 人</Typography>
                                    <Typography><strong>日程:</strong> {post.date}</Typography>
                                </Box>
                            </Box>
                        ))}

                    {/* 応募タブ */}
                    {selectedTab === 1 && postList
                        .filter(post => post.author?.id === userId) // 現在のユーザーが投稿したもののみ表示
                        .map((post) => (
                            <Box
                                key={post.id}
                                p={2}
                                boxShadow={2}
                                borderRadius={2}
                                mb={2}
                                bgcolor="white"
                                sx={{
                                    cursor: "pointer",
                                    "&:hover": { boxShadow: 5 },
                                    transition: "0.2s",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2
                                }}
                                onClick={() => navigate("/detail", { state: post })}
                            >
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                    {post.status === "approved" ? (
                                        <>
                                            <CheckCircleIcon sx={{ color: "#1DA1F2", fontSize: 28 }} />
                                            <Typography variant="caption" sx={{ color: "#1DA1F2", mt: 0.5 }}>承認済</Typography>
                                        </>
                                    ) : (
                                        <>
                                            <img src="waiting.jpeg" alt="Waiting" style={{ width: 50, height: 50, objectFit: "cover" }} />
                                            <Typography variant="caption" sx={{ color: "red", mt: 0.5 }}>承認待ち</Typography>
                                        </>
                                    )}
                                </Box>
                                <Box>
                                    <Typography><strong>スポーツ:</strong> {post.sport}</Typography>
                                    <Typography><strong>募集人数:</strong> {post.people} 人</Typography>
                                    <Typography><strong>日程:</strong> {post.date}</Typography>
                                </Box>
                            </Box>
                        ))}
                </Box>
            </Box>
        </Container>
    );
};

export default ManagementEvent;
