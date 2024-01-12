import { Box, Button, ButtonBase, Card, CardContent, Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL, FRIENDS_PAGE_SIZE } from "../../../constants/Constants";
import { useNavigate } from "react-router-dom";

const AccountStats = () => {

    const pageSize = FRIENDS_PAGE_SIZE;

    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [listOfFollowing, setListOfFollowing] = useState([]);
    const [listOfFollowers, setListOfFollowers] = useState([]);
    const [followersLastPage, setFollowersLastPage] = useState(false);
    const [followingLastPage, setFollowingLastPage] = useState(false);
    const [followerPage, setFollowerPage] = useState(0);
    const [followingPage, setFollowingPage] = useState(0);
    const [openFollowersDialog, setOpenFollowersDialog] = useState(false);
    const [openFollowingDialong, setOpenFollowingDialog] = useState(false);
    const navigate = useNavigate();

    const typographyStyle = {
        fontFamily: 'Josefin, sans-serif',
        fontSize: '18px',
        textAlign:'center'
    }

    const buttonStyle = {
        color: "white",
        margin:"0px",
        padding:"0px",
        '&:hover': {
            backgroundColor: 'transparent',
          },
    }

    const dialogContentStyle = {
        width: "250px",
        height: "400px",
        display: 'flex',
        justifyContent: 'center',
    }

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/user/followers-stats`, {
                    headers: headers
                });
                setFollowing(response.data.follows);
                setFollowers(response.data.followers);
            } catch (error) {
                console.log(error);
            }
        }
        fetchStats();
    }, []);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/user/followers`, {
                    headers: headers,
                    params: {page: followerPage}
                });
                setListOfFollowers(l => [...l, ...response.data]);
                if (response.data.length < pageSize) {
                    setFollowersLastPage(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchFollowers();
    }, [followerPage, pageSize]);

    useEffect(() => {
        const fetchFollowing = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/user/following`, {
                    headers: headers,
                    params: {page: followingPage}
                });
                setListOfFollowing(l => [...l, ...response.data]);
                if (response.data.length < pageSize) {
                    setFollowingLastPage(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchFollowing();
    }, [followingPage, pageSize]);

    const handleFollowersClick = async () => {
        setOpenFollowersDialog(true);
    }

    const handleFollowingClick = () => {
        setOpenFollowingDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenFollowersDialog(false);
        setOpenFollowingDialog(false);
    }

    const toUserProfilePage = (id) => {
        if (id !== null) {
            navigate(`/user-profile?user=${encodeURIComponent(id)}`);
        }
    }

    return (
        <Box>
            <Dialog
                open={openFollowersDialog}
                onClose={handleCloseDialog}
            >
                <DialogContent
                    sx={dialogContentStyle}
                >
                    <Grid
                        width="100%"
                    >
                        <Grid item>
                            <Typography sx={typographyStyle} marginBottom="20px">
                                Followers
                            </Typography>
                        </Grid>
                        {listOfFollowers.map((follower, index) => (
                            <Grid
                                item 
                                key={index}
                                sx={{
                                    paddingBottom:'10px',
                                    alignItems:'center'
                                }}
                            >
                                <ButtonBase
                                    onClick={() => toUserProfilePage(follower.id)}
                                    width='300px'
                                >
                                    <Card
                                        key={follower.id}
                                    >
                                        <CardContent
                                            sx={{
                                                display:'flex',
                                                marginBottom:'-8px',
                                                marginTop: '-8px',
                                            }}
                                        >
                                            <Typography
                                                fontSize="14px"
                                                width="170px"
                                            >
                                                {follower.username}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ButtonBase>
                            </Grid>
                        ))}
                        <Grid item>
                        {
                        !followersLastPage &&
                        <Button
                            onClick={() => setFollowerPage(followerPage + 1)}
                            sx={{
                                mt: '10px',
                                mb: '50px',
                                color: 'white'
                            }}
                        >
                            Load more
                        </Button>
                        }
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog
                open={openFollowingDialong}
                onClose={handleCloseDialog}
            >
                <DialogContent
                    sx={dialogContentStyle}
                >
                   <Grid
                        width="100%"
                    >
                        <Grid item>
                            <Typography sx={typographyStyle} marginBottom="20px">
                                Following
                            </Typography>
                        </Grid>
                        {listOfFollowing.map((following, index) => (
                            <Grid
                                item 
                                key={index}
                                sx={{
                                    paddingBottom:'10px',
                                    alignItems:'center'
                                }}
                            >
                                <ButtonBase
                                    onClick={() => toUserProfilePage(following.id)}
                                    width='300px'
                                >
                                    <Card
                                        key={following.id}
                                    >
                                        <CardContent
                                            sx={{
                                                display:'flex',
                                                marginBottom:'-8px',
                                                marginTop: '-8px',
                                            }}
                                        >
                                            <Typography
                                                fontSize="14px"
                                                width="170px"
                                            >
                                                {following.username}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ButtonBase>
                            </Grid>
                        ))}
                        <Grid item>
                        {
                        !followingLastPage &&
                        <Button
                            onClick={() => setFollowingPage(followingPage + 1)}
                            sx={{
                                mt: '10px',
                                mb: '50px',
                                color: 'white'
                            }}
                        >
                            Load more
                        </Button>
                        }
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Grid>
                <Grid item>
                    <Typography
                        style={typographyStyle}
                    >
                        You have  <span style={{ fontWeight: 'bold' }} >{followers}</span> <Button sx={buttonStyle} onClick={handleFollowersClick}> followers </Button>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                            style={typographyStyle}
                        >
                            You are <Button sx={buttonStyle} onClick={handleFollowingClick}> following </Button>  <span style={{ fontWeight: 'bold' }}>{following}</span> people
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
 
export default AccountStats;