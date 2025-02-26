import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

function Confirm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { date, sport, people, comment, ageGroup, gender, skillLevel } = location.state || {};

    if (!date || !sport || !people || !comment || !ageGroup || !gender || !skillLevel) {
        return <Typography textAlign="center">データがありません</Typography>;
    }

    const handleModify = () => {
        navigate("/recruit", {
            state: { date, sport, people, comment, ageGroup, gender, skillLevel }
        });
    };

    const handleSubmit = () => {
        console.log("投稿内容:", { date, sport, people, comment, ageGroup, gender, skillLevel });
        alert("募集が投稿されました!");
        navigate("/");
    };

    return (
        <Box maxWidth={500} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
            <Typography variant="h4" gutterBottom textAlign="center">
                募集内容の確認
            </Typography>
            <Typography><strong>日程:</strong> {date}</Typography>
            <Typography><strong>スポーツ:</strong> {sport}</Typography>
            <Typography><strong>募集人数:</strong> {people} 人</Typography>
            <Typography><strong>年齢カテゴリ:</strong> {ageGroup}</Typography>
            <Typography><strong>性別:</strong> {gender}</Typography>
            <Typography><strong>スキルレベル:</strong> {skillLevel}</Typography>
            <Typography><strong>コメント:</strong> {comment}</Typography>

            <Box display="flex" justifyContent="space-between" mt={3}>
                <Button variant="outlined" onClick={handleModify}>
                    修正する
                </Button>
                <Button variant="contained" onClick={handleSubmit}>投稿する</Button>
            </Box>
        </Box>
    );
}

export default Confirm;
