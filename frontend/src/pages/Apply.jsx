import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";

function Apply() {
  const [people, setPeople] = useState("");
  const [comment, setComment] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("");
  const [skillLevel, setSkillLevel] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = location.state || {};
  const { id } = useParams();

  useEffect(() => {
    if (location.state) {
      const { people, ageGroup, gender, skillLevel, comment } = location.state;
      setPeople(people || "");
      setAgeGroup(ageGroup || "");
      setGender(gender || "");
      setSkillLevel(skillLevel || "");
      setComment(comment || "");
    }
  }, [location.state]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!people || !ageGroup || !gender || !skillLevel) {
      alert("すべての項目を入力してください。");
      return;
    }

    const peopleNumber = parseInt(people, 10);
    if (isNaN(peopleNumber) || peopleNumber <= 0) {
      alert("募集人数は正しい数字を入力してください。");
      return;
    }

    navigate(`/post/${id}/applyconfirm`, {
      state: {
        ...eventData,
        people: peopleNumber,
        comment,
        ageGroup,
        gender,
        skillLevel,
      },
    });
  };

  return (
    <Box maxWidth={500} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h4" gutterBottom textAlign="center">
        応募フォーム
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="参加人数"
          type="number"
          fullWidth
          value={people}
          onChange={(e) => setPeople(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>年齢カテゴリ</InputLabel>
          <Select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <MenuItem value="">年齢を選択</MenuItem>
            <MenuItem value="小学生">小学生</MenuItem>
            <MenuItem value="中学生">中学生</MenuItem>
            <MenuItem value="高校生">高校生</MenuItem>
            <MenuItem value="大学生">大学生</MenuItem>
            <MenuItem value="社会人20代">社会人20代</MenuItem>
            <MenuItem value="社会人30代">社会人30代</MenuItem>
            <MenuItem value="社会人40代">社会人40代</MenuItem>
            <MenuItem value="社会人50代">社会人50代</MenuItem>
            <MenuItem value="社会人60代">社会人60代</MenuItem>
            <MenuItem value="社会人70代以上">社会人70代以上</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>性別</InputLabel>
          <Select value={gender} onChange={(e) => setGender(e.target.value)}>
            <MenuItem value="">性別を選択</MenuItem>
            <MenuItem value="男性">男性</MenuItem>
            <MenuItem value="女性">女性</MenuItem>
            <MenuItem value="その他">その他</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>レベル選択（参加者）</InputLabel>
          <Select
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            <MenuItem value="">参加者のレベルを選択</MenuItem>
            <MenuItem value="初心者">初心者</MenuItem>
            <MenuItem value="中級者">中級者</MenuItem>
            <MenuItem value="上級者">上級者</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="コメント"
          multiline
          rows={4}
          fullWidth
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          margin="normal"
        />
        <Box textAlign="center" mt={3}>
          <Button type="submit" variant="contained">
            確認画面へ
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default Apply;
