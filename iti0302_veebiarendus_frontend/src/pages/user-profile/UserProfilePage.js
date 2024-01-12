import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constants/Constants";
import { Box, Button, CircularProgress, Dialog, DialogContent, Grid, Typography } from "@mui/material";

import { useAuth } from "../components/AuthContext";
import LatestLikes from "./components/LatestLikes";
import LatestRatings from "./components/LatestRatings";
import LatestReviews from "./components/LatestReviews";

const UserProfilePage = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const userId = searchParams.get('user');
    const [username, setUsername] = useState(null);
    const [following, setFollowing] = useState(null);

    const [reviewText, setReviewText] = useState("");
    const [reviewAlbum, setReviewAlbum] = useState("");
    const [reviewArtist, setReviewArtist] = useState("");
    const [open, setOpen] = useState(false);

    const { id } = useAuth();

    const handleOpen = (review) => {
        setReviewText(review.text);
        setReviewAlbum(review.album.name);
        setReviewArtist(review.album.artist);
        setOpen(true);
    }

    const handleClose = () => {
        setReviewText("");
        setReviewAlbum("");
        setReviewArtist("");
        setOpen(false);
    }

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/user/profile`, {
                    headers: headers,
                    params: {user: userId}
                });
                setUsername(response.data.username);
                setFollowing(response.data.following);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserProfile()
    }, [userId]);

    const handleFollow = async () => {
        const postData = {
            "userFollowedId": userId
        }
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
        try {
            await axios.post(`${API_BASE_URL}/user/follow`, postData, {headers: headers});
            setFollowing(!following);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnfollow = async () => {
        const postData = {
            "userFollowedId": userId
          };
          const config = {
            method: 'DELETE',  // Use the DELETE method
            url: `${API_BASE_URL}/user/unfollow`,
            data: postData,     // Include data in the request
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("jwt")}`  // Include the JWT token as a Bearer token
            }
          };
        
          try {
            await axios(config);
            setFollowing(!following);
          } catch (error) {
            console.log(error);
          }
    }

    return (
        <Box
            sx={{
                width: 'calc(100vw - 250px)', // 100% of the viewport width
                transform: 'translate(250px)',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center', // Center horizontally
            }}
        >
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <Typography
                        style={{
                            fontFamily: 'Josefin, sans-serif',
                            fontSize: '22px',
                        }}  
                    >
                        { reviewAlbum} <br/>
                    </Typography>
                    <Typography
                        style={{
                            fontFamily: 'Josefin, sans-serif',
                            fontSize: '16px',
                        }}
                    >
                        { reviewArtist} <br/> <br/>
                    </Typography>
                    <Typography
                        style={{
                            fontFamily: 'Josefin, sans-serif',
                            fontSize: '18px',
                        }}
                    >
                        { reviewText }  <br/> <br/>
                    </Typography>
                    <Typography
                        style={{
                            fontFamily: 'Josefin, sans-serif',
                            fontSize: '20px',
                        }}
                    >
                        { username }
                    </Typography>
                </DialogContent>
            </Dialog>
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
                { username }
            </Typography>
            <Box
                sx={{
                    position: 'absolute',
                    marginTop: '100px',
                }}
            >
                { following === null ? <CircularProgress color="inherit" /> :
                    parseInt(userId) !== id && <Button
                        variant="outlined"
                        onClick={following? handleUnfollow : handleFollow}
                        sx={{
                            width:'150px',
                            color: following ? '#FF8888' : '#88FFBB',
                            borderColor: following ? '#FF8888' : '#88FFBB',
                            '&:hover': {
                                borderColor: following ?'#FF8888' : '#88FFBB', // Change the color on hover
                            },
                        }}
                    >
                        {following ? "Unfollow" : "Follow"}
                    </Button>
                }
            </Box>
            <Box
                sx={{
                    flexGrow: '1',
                    marginTop: '250px',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                        <Typography
                            style={{
                                fontFamily: 'Josefin, sans-serif',
                                fontSize: '22px',
                            }}
                            sx={{
                                position: 'absolute',
                            }}
                        >
                            Latest likes
                        </Typography>
                        </Box>
                        <LatestLikes userId={userId}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                        <Typography
                            style={{
                                fontFamily: 'Josefin, sans-serif',
                                fontSize: '22px',
                            }}
                            sx={{
                                position: 'absolute',
                            }}
                        >
                            Latest ratings
                        </Typography>
                        </Box>
                        <LatestRatings userId={userId}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                        <Typography
                            style={{
                                fontFamily: 'Josefin, sans-serif',
                                fontSize: '22px',
                            }}
                            sx={{
                                position: 'absolute',
                            }}
                        >
                            Latest reviews
                        </Typography>
                        </Box>
                        <LatestReviews userId={userId} handleOpen={handleOpen}/>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
 
export default UserProfilePage;