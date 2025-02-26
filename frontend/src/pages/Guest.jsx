// Guest.jsx
import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Guest = () => {
    const navigate = useNavigate();

    // 仮の募集データ
    const [recruitList, setRecruitList] = useState([
        { id: 1, sport: "サッカー", people: 5, date: "2025-03-01", ageGroup: "大学生", gender: "男性", skillLevel: "初心者", comment: "楽しくプレイしましょう！" },
        { id: 2, sport: "バスケ", people: 3, date: "2025-03-05", ageGroup: "中学生", gender: "女性", skillLevel: "中級者", comment: "チームワークを大切にします。" }
    ]);

    return (
        <div>
            {recruitList.map((recruit, index) => (
                <Box key={index} p={2} boxShadow={2} borderRadius={2} mb={2}>
                    <Typography><strong>スポーツ:</strong> {recruit.sport}</Typography>
                    <Typography><strong>募集人数:</strong> {recruit.people} 人</Typography>
                    <Typography><strong>日程:</strong> {recruit.date}</Typography>

                    <Button
                        variant="outlined"
                        onClick={() => navigate("/detail", { state: recruit })} // 詳細ページに遷移
                    >
                        詳細を見る
                    </Button>
                </Box>
            ))}
        </div>
    );
};

export default Guest;
