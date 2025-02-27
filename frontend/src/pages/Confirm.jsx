import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

function Confirm() {
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
    navigate("/recruit", {
      state: {
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
      },
    });
  };

  const handleSubmit = async () => {
    try {
      console.log("投稿内容:", {
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
      });

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
          photoURL: auth.currentUser?.photoURL || "",
        },
        applier: {},
        createdAt: serverTimestamp(), // Firestoreのタイムスタンプを使用
      });

      alert("募集が投稿されました!");
      navigate("/");
    } catch (error) {
      console.error("投稿エラー:", error);
      alert("投稿に失敗しました。");
    }
  };

  return (
    <Box
      maxWidth={500}
      mx="auto"
      mt={5}
      p={3}
      boxShadow={3}
      borderRadius={2}
      bgcolor="white"
    >
      <Typography variant="h4" gutterBottom textAlign="center">
        募集内容の確認
      </Typography>
      <Typography>
        <strong>日程:</strong> {date}
      </Typography>
      <Typography>
        <strong>スポーツ:</strong> {sport}
      </Typography>
      <Typography>
        <strong>場所:</strong> {place}
      </Typography>
      <Typography>
        <strong>募集人数:</strong> {people} 人
      </Typography>
      <Typography>
        <strong>年齢カテゴリ:</strong> {ageGroup}
      </Typography>
      <Typography>
        <strong>性別:</strong> {gender}
      </Typography>
      <Typography>
        <strong>スキルレベル:</strong> {skillLevel}
      </Typography>
      <Typography>
        <strong>コメント:</strong> {comment}
      </Typography>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined" type="button" onClick={handleModify}>
          修正する
        </Button>
        <Button variant="contained" type="button" onClick={handleSubmit}>
          投稿する
        </Button>
      </Box>
    </Box>
  );
}

export default Confirm;
