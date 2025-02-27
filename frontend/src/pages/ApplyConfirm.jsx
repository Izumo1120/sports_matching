import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function ApplyConfirm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { date, sport, place, people, comment, ageGroup, gender, skillLevel } =
    location.state || {};

  if (!location.state) {
    return <Typography textAlign="center">データがありません</Typography>;
  }

  const handleModify = () => {
    navigate(`/post/${id}/apply`, {
      state: location.state,
    });
  };

  const handleSubmit = async () => {
    if (!id) {
      alert("イベントIDが見つかりません。");
      return;
    }

    try {
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, {
        [`applier.${auth.currentUser.uid}`]: {
          username: auth.currentUser?.displayName || "匿名",
          id: auth.currentUser?.uid || "unknown",
          photoURL: auth.currentUser?.photoURL || "",
          people,
          ageGroup,
          gender,
          skillLevel,
          comment,
        },
      });

      alert("応募が完了しました!");
      navigate("/guest");
    } catch (error) {
      console.error("応募エラー:", error);
      alert("応募に失敗しました。");
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
        応募内容の確認
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
        <Button variant="outlined" onClick={handleModify}>
          修正する
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          応募する
        </Button>
      </Box>
    </Box>
  );
}

export default ApplyConfirm;
