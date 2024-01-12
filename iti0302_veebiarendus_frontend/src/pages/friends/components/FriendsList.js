import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, FRIENDS_PAGE_SIZE } from "../../../constants/Constants";
import { useNavigate } from "react-router-dom";

import AccountBoxIcon from '@mui/icons-material/AccountBox';

const FriendsList = () => {

    const pageSize = FRIENDS_PAGE_SIZE;
    const [friends, setFriends] = useState([]);
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/user/following`, {
                    headers: headers,
                    params: {page: page}
                });
                setFriends(f => [...f, ...response.data]);
                if (response.data.length < pageSize) {
                    setLastPage(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchFriends();
    }, [page, pageSize]);

    const toUserProfilePage = (id) => {
        if (id !== null) {
            navigate(`/user-profile?user=${encodeURIComponent(id)}`);
        }
    }

    return (
        <Box
            sx={{
                marginTop: '50px'
            }}
        >
            {friends.map((friend) => {
                return (
                    <Card
                        key={friend.id}
                        sx={{
                            marginBottom:'20px',
                        }}
                    >

                            <CardContent
                                sx={{
                                    display:'flex',
                                }}
                            >
                                <Typography
                                    fontSize="16px"
                                    sx={{
                                        width: '300px',
                                        pl:'16px',
                                        mt: '10px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {friend.username}
                                </Typography>
                                <Box>
                                <Button
                                    variant="contained"
                                    startIcon={<AccountBoxIcon />}
                                    onClick={() => toUserProfilePage(friend.id)}
                                    sx={{
                                        width:'150px',
                                        backgroundColor:'#E2E2E2',
                                        '&:hover': {
                                            backgroundColor: '#E57373', // Change the color on hover
                                          },
                                    }}
                                >
                                    visit profile
                                </Button>
                            </Box>
                            </CardContent>
                    </Card>
                )
            })}
            { !lastPage &&             
            <Button
                onClick={() => setPage(page + 1)}
                sx={{
                    mt: '10px',
                    mb: '50px',
                    color: 'white'
                }}
            >
                Load more
            </Button>}
        </Box>
    );
}
 
export default FriendsList;