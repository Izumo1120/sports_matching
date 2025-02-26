import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText, Divider, Paper } from "@mui/material";

function RecruitList() {
    const navigate = useNavigate();

    // 仮の募集データ
    const [recruits, setRecruits] = useState([
        {
            id: 1,
            sport: "サッカー",
            people: 10,
            ageGroup: "社会人20代",
            gender: "男性",
            skillLevel: "中級者",
        },
        {
            id: 2,
            sport: "バスケットボール",
            people: 6,
            ageGroup: "高校生",
            gender: "男女混合",
            skillLevel: "上級者",
        },
        {
            id: 3,
            sport: "テニス",
            people: 2,
            ageGroup: "社会人30代",
            gender: "女性",
            skillLevel: "初心者",
        },
    ]);

    // 募集をクリックしたときの処理（詳細ページへ遷移）
    const handleClick = (id) => {
        navigate(`/recruit/${id}`); // 将来的に詳細ページへ
    };

    return (
        <Box maxWidth={600} mx="auto" mt={5} p={3}>
            <Typography variant="h4" gutterBottom textAlign="center">
                募集一覧
            </Typography>
            <Paper elevation={3}>
                <List>
                    {recruits.map((recruit, index) => (
                        <div key={recruit.id}>
                            <ListItem button onClick={() => handleClick(recruit.id)}>
                                <ListItemText
                                    primary={`${recruit.sport} - ${recruit.people}人募集`}
                                    secondary={`年齢: ${recruit.ageGroup} / 性別: ${recruit.gender} / レベル: ${recruit.skillLevel}`}
                                />
                            </ListItem>
                            {index < recruits.length - 1 && <Divider />}
                        </div>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}

export default RecruitList;
