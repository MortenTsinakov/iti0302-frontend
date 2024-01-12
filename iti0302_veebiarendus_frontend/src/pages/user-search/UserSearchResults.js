import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constants/Constants";
import LoadingPage from "../components/LoadingPage";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const UserSearchResults = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const user = searchParams.get('user');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (user === null || user.trim() === '') {
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/user/search`, {
                    headers: headers,
                    params: {user: user}
                });
                setResults(response.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchData();
    }, [user]);

    const toUserProfilePage = (id) => {
        if (id !== null) {
            navigate(`/user-profile?user=${encodeURIComponent(id)}`);
        }
    }

    const resultCards = () => {
        if (results.length === 0) {
            return (
                <Box
                    sx={{
                        marginTop:'150px'
                    }}
                >
                    <Typography
                        style={{
                            fontFamily: 'Josefin, sans-serif',
                            fontSize: '18px',
                        }}
                    >
                        Sorry, we couldn't find the user you were looking for...
                    </Typography>
                </Box>
            )
        }
        return (
            <Box
                sx={{
                    marginTop:'150px'
                }}
            >
                {results.map((result) => {
                    return (
                        <Card
                            key={result.id}
                            sx={{
                                width:'500px',
                                marginBottom:'20px'
                            }}
                        >

                                <CardContent
                                    sx={{
                                        display:'flex',
                                        // alignItems:'left'
                                    }}
                                >
                                    <Typography
                                        fontSize="20px"
                                        sx={{
                                            width: '300px',
                                            pl:'20px',
                                            // pr:'210px'
                                        }}
                                    >
                                        {result.username}
                                    </Typography>
                                    <Box>
                                    <Button
                                        variant="contained"
                                        startIcon={<AccountBoxIcon />}
                                        onClick={() => toUserProfilePage(result.id)}
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
            </Box>
        )
    }

    return (
        <Box
            sx={{
                width: 'calc(100vw - 250px)', // 100% of the viewport width
                transform: 'translate(250px)',
                position: 'fixed', // Fixed position to cover the entire viewport
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center', // Center horizontally
            }}
        >
            <Typography
                style={{
                    fontFamily: 'Josefin, sans-serif',
                    fontSize: '22px',
                }}
                sx={{
                    position: 'absolute',
                    maxWidth: '500px',
                    transform: 'translate(0, 50px)'
                }}
            >
                Search results:
            </Typography>
            {loading ? <LoadingPage />
            :
            resultCards()
            }
        </Box>
    );
}
 
export default UserSearchResults;