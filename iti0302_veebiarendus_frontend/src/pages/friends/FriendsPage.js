import { Box, Grid, Typography } from "@mui/material";
import FriendsSearch from "./components/FriendsSearch";
import FriendsLikes from "./components/FriendsLikes";
import FriendsRatings from "./components/FriendsRatings";
import FriendsReviews from "./components/FriendsReviews";
import FriendsList from "./components/FriendsList";
import { useAuth } from "../components/AuthContext";

const FriendsPage = () => {

    const {username} = useAuth();
    const containers = [
        {'text': 'My friends', 'component': <FriendsList />},
        {'text': 'Latest Likes by Friends', 'component': <FriendsLikes />},
        {'text': 'Latest Ratings by Friends', 'component': <FriendsRatings />},
        {'text': 'Latest Reviews by Friends', 'component': <FriendsReviews />}
    ];

    return (
        
        <Box
            sx={{
                width: 'calc(100vw - 250px)', // 100% of the viewport width
                transform: 'translate(250px)',
                // position: 'fixed', // Fixed position to cover the entire viewport
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center', // Center horizontally
            }}
        >
            <Box
                sx={{
                    flexGrow: '1',
                    marginTop: '150px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingBottom: '75px'
                    }}
                >
                    <FriendsSearch />
                </Box>
                <Grid container spacing={2}>
                    {containers.map((container, index) => (
                        <Grid item xs={3} key={index}>
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
                            {container.text}
                        </Typography>
                        </Box>
                        { container.component }
                    </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
 
export default FriendsPage;