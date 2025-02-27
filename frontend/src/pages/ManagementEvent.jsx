import React, { useState } from "react";
import { Tabs, Tab, Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // ✅ アイコンをインポート

const ManagementEvent = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const navigate = useNavigate();

    // タブの変更を処理
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // 仮の募集データ
    const [recruitList, setRecruitList] = useState([
        { id: 1, sport: "サッカー", people: 5, date: "2025-03-01", ageGroup: "大学生", gender: "男性", skillLevel: "初心者", comment: "楽しくプレイしましょう！" },
        { id: 2, sport: "バスケ", people: 3, date: "2025-03-05", ageGroup: "中学生", gender: "女性", skillLevel: "中級者", comment: "チームワークを大切にします。" }
    ]);

    return (
        <Container maxWidth="sm">
            <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    イベント管理ページ
                </Typography>

                {/* タブUI */}
                <Tabs 
                    value={selectedTab} 
                    onChange={handleChange} 
                    centered
                    sx={{
                        "& .MuiTabs-indicator": { backgroundColor: "#1DA1F2" }, // 下線の色をTwitter風に
                        "& .MuiTab-root": { fontSize: "16px", fontWeight: "bold", textTransform: "none" },
                        "& .Mui-selected": { color: "#1DA1F2" } // 選択中のタブの色
                    }}
                >
                    <Tab label="募集" />
                    <Tab label="応募" />
                </Tabs>

                {/* タブのコンテンツ */}
                <Box sx={{ mt: 3 }}>
                    {/* 募集タブの内容 */}
                    {selectedTab === 0 && (
                        <>
                            {recruitList.map((recruit, index) => (
                                <Box
                                    key={index}
                                    p={2}
                                    boxShadow={2}
                                    borderRadius={2}
                                    mb={2}
                                    bgcolor="white"
                                    sx={{
                                        cursor: "pointer", // クリック可能に
                                        "&:hover": { boxShadow: 5 }, // ホバー時の影を強調
                                        transition: "0.2s",
                                        display: "flex", // 横並びにする
                                        alignItems: "center", // 縦方向の中央揃え
                                        justifyContent: "flex-start", // 左寄せ
                                        gap: 2, // 画像とテキストの間にスペース
                                        textAlign: "center" // テキストを中央揃え
                                    }}
                                    onClick={() => navigate("/detail", { state: recruit })} // クリックで詳細ページに遷移
                                >
                                    {/* 左側の画像 */}
                                    <img 
                                        src="/waiting.jpeg" 
                                        alt="Waiting" 
                                        style={{ width: "50px", height: "50px", borderRadius: "8px" }} 
                                    />

                                    {/* 右側の情報 */}
                                    <Box>
                                        <Typography><strong>スポーツ:</strong> {recruit.sport}</Typography>
                                        <Typography><strong>募集人数:</strong> {recruit.people} 人</Typography>
                                        <Typography><strong>日程:</strong> {recruit.date}</Typography>
                                    </Box>
                                </Box>
                            ))}

                        </>
                    )}
                    
                    {/* 応募タブの内容 */}
                    {selectedTab === 1 && (
                        <>
                            {recruitList.map((recruit, index) => (
                                <Box
                                    key={index}
                                    p={2}
                                    boxShadow={2}
                                    borderRadius={2}
                                    mb={2}
                                    bgcolor="white"
                                    sx={{
                                        cursor: "pointer", // クリック可能に
                                        "&:hover": { boxShadow: 5 }, // ホバー時の影を強調
                                        transition: "0.2s",
                                        display: "flex", // 横並びにする
                                        alignItems: "center", // 縦方向の中央揃え
                                        justifyContent: "center", // 横方向の中央揃え
                                        gap: 2, // アイコンとテキストの間にスペース
                                        textAlign: "center" // テキストを中央揃え
                                    }}
                                    onClick={() => navigate("/detail", { state: recruit })} // クリックで詳細ページに遷移
                                >
                                    {/* 左側のチェックアイコンまたは「waiting.jpeg」 */}
                                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                        {recruit.status === "approved" || recruit.id === 1 ? (
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

                                    {/* 右側の情報 */}
                                    <Box>
                                        <Typography><strong>スポーツ:</strong> {recruit.sport}</Typography>
                                        <Typography><strong>募集人数:</strong> {recruit.people} 人</Typography>
                                        <Typography><strong>日程:</strong> {recruit.date}</Typography>
                                    </Box>
                                </Box>
                            ))}
                        </>
                    )}


                </Box>
            </Box>
        </Container>
    );
};

export default ManagementEvent;
