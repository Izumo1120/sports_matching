import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

function ApplyConfirm() {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        date = "未設定",
        sport = "未設定",
        place = "未設定",
        people = "未設定",
        comment = "未設定",
        ageGroup = "未設定",
        gender = "未設定",
        skillLevel = "未設定",
        appOrRec = "未設定",
        approve = "未設定",
    } = location.state || {};

    if (!location.state) {
        return <Typography textAlign="center">データがありません</Typography>;
    }

    const handleModify = () => {
        navigate("/apply", {
            state: { date, sport, place, people, comment, ageGroup, gender, skillLevel, appOrRec, approve }
        });
    };

    const handleSubmit = async () => {
        try {
            console.log("応募内容:", { date, sport, place, people, comment, ageGroup, gender, skillLevel, appOrRec, approve });

            await addDoc(collection(db, "events"), {
                date,
                sport,
                place,
                people,
                comment,
                ageGroup,
                gender,
                skillLevel,
                appOrRec,
                approve,
                author: {
                    username: auth.currentUser?.displayName || "匿名",
                    id: auth.currentUser?.uid || "unknown",
                },
                createdAt: new Date(),
            });

            alert("応募が完了しました!");
            navigate("/guest");
        } catch (error) {
            console.error("エラー:", error);
            alert("応募に失敗しました。");
        }
    };

    return (
        <Box maxWidth={500} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2} bgcolor="white">
            <Typography variant="h4" gutterBottom textAlign="center">
                応募内容の確認
            </Typography>
            <Typography><strong>募集人数:</strong> {people} 人</Typography>
            <Typography><strong>年齢カテゴリ:</strong> {ageGroup}</Typography>
            <Typography><strong>性別:</strong> {gender}</Typography>
            <Typography><strong>スキルレベル:</strong> {skillLevel}</Typography>
            <Typography><strong>コメント:</strong> {comment}</Typography>

            <Box display="flex" justifyContent="space-between" mt={3}>
                <Button variant="outlined" type="button" onClick={handleModify}>
                    修正する
                </Button>
                <Button variant="contained" type="button" onClick={handleSubmit}>
                    応募する
                </Button>
            </Box>
        </Box>
    );
}

export default ApplyConfirm;
