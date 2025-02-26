import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, Select, MenuItem, Button, Box, Typography, FormControl, InputLabel } from "@mui/material";

function Recruit() {
    const [date, setDate] = useState("");
    const [sport, setSport] = useState("");
    const [people, setPeople] = useState("");
    const [comment, setComment] = useState("");
    const [ageGroup, setAgeGroup] = useState("");
    const [gender, setGender] = useState("");
    const [skillLevel, setSkillLevel] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Confirm画面から戻ってきた場合にフォームの内容を更新
    useEffect(() => {
        if (location.state) {
            const { date, sport, people, ageGroup, gender, skillLevel, comment } = location.state;
            setDate(date);
            setSport(sport);
            setPeople(people);
            setAgeGroup(ageGroup);
            setGender(gender);
            setSkillLevel(skillLevel);
            setComment(comment);
        }
    }, [location.state]);

    // 次の画面へ進む処理
    const handleNext = (event) => {
        event.preventDefault();
        // 入力内容のバリデーション
        if (!date || !sport || !people || !comment || !ageGroup || !gender || !skillLevel) {
            alert("すべての項目を入力してください。");
            return;
        }

        // peopleが数字であることを確認
        const peopleNumber = parseInt(people, 10);
        if (isNaN(peopleNumber) || peopleNumber <= 0) {
            alert("募集人数は正しい数字を入力してください。");
            return;
        }

        // 確認画面へ遷移
        navigate("/confirm", {
            state: { date, sport, people: peopleNumber, comment, ageGroup, gender, skillLevel },
        });
    };

    return (
        <Box maxWidth={500} mx="auto" mt={5} p={3} boxShadow={3} borderRadius={2}>
            <Typography variant="h4" gutterBottom textAlign="center">
                募集要項入力
            </Typography>
            <form onSubmit={handleNext}>
                <TextField
                    label="日程"
                    type="date"
                    fullWidth
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>スポーツ</InputLabel>
                    <Select value={sport} onChange={(e) => setSport(e.target.value)}>
                        <MenuItem value="">スポーツを選択</MenuItem>
                        <MenuItem value="サッカー">サッカー</MenuItem>
                        <MenuItem value="バスケットボール">バスケットボール</MenuItem>
                        <MenuItem value="テニス">テニス</MenuItem>
                        <MenuItem value="バドミントン">バドミントン</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="募集人数"
                    type="number"
                    fullWidth
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>年齢カテゴリ</InputLabel>
                    <Select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
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
                    <Select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
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
                <Box textAlign="right" mt={3}>
                    <Button type="submit" variant="contained">確認画面へ</Button>
                </Box>
            </form>
        </Box>
    );
}

export default Recruit;
