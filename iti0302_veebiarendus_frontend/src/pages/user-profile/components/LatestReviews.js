import { Box, ButtonBase, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import axios from "axios";
import { API_BASE_URL } from "../../../constants/Constants";
import { useNavigate } from "react-router-dom";

const LatestReviews = ({userId, handleOpen}) => {

    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/review/users-latest`, {
                    headers: headers,
                    params: {user: userId}
                });
                setReviews(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserReviews();
    }, [userId]);

    const navigateToAlbumInfoPage = (album, artist) => {
        navigate(`/album-info?album=${encodeURIComponent(album)}&artist=${encodeURIComponent(artist)}`);
    }

    return (
        <Box
            sx={{
                marginTop:'50px'
            }}
        >
            {reviews.map((review, index) => {
                return (
                    <Card
                        key={index}
                        sx={{
                            marginBottom:'10px',
                            marginLeft: '10px',
                            marginRight: '10px',
                            height:'100px',
                            display:"flex",
                            borderRadius:"0px 10px 10px 10px",
                        }}
                    >
                        <ButtonBase
                            onClick={() => navigateToAlbumInfoPage(review.album.name, review.album.artist)}
                        >
                            {review.album.imageUrl ? (
                            <CardMedia
                                component="img"
                                alt="Image"
                                width="140"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover'
                                }}
                                image={ review.album.imageUrl }
                                title={ review.album.name }
                            />
                            ) : null}
                        </ButtonBase>
                        <CardContent
                            style={{
                                flex: 1,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Typography
                                style={{
                                    fontFamily: 'Josefin, sans-serif',
                                    fontSize: '20px',
                                }}  
                            >
                                { review.album.name }
                            </Typography>
                            <Typography 
                                color={"#E3E3E3"}
                                style={{
                                    fontFamily: 'Josefin, sans-serif',
                                    fontSize: '15px',
                                }}
                            >
                                { review.album.artist }
                            </Typography>
                                <IconButton
                                    onClick={() => handleOpen(review)}
                                >
                                    <LibraryBooksIcon 
                                        sx={{fontSize:"20px", marginTop:'-5px', marginLeft:'-8px'}}    
                                    />
                                    <Typography
                                        color={"#E3E3E3"}
                                        style={{
                                            fontFamily: 'Josefin, sans-serif',
                                            fontSize: '15px',
                                        }}
                                        sx={{
                                            ml: '10px'
                                        }}
                                    >
                                        Read review
                                    </Typography>
                                </IconButton>
                        </CardContent>
                    </Card>
                )
            })}
        </Box>
    );
}
 
export default LatestReviews;