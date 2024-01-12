import { Box, ButtonBase, Card, CardContent, CardMedia, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import axios from "axios";
import { API_BASE_URL } from "../../../constants/Constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LatestRatings = ({userId}) => {

    const [ratings, setRatings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRatings = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/rate/users-latest`, {
                    headers: headers,
                    params: {user: userId}
                });
                setRatings(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserRatings();
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
            {ratings.map((rating, index) => {
                const starsArray = Array.from({length: rating.score}, (_, index) => index);
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
                            onClick={() => navigateToAlbumInfoPage(rating.album.name, rating.album.artist)}
                        >
                        {rating.album.imageUrl ? (
                            <CardMedia 
                                component="img"
                                alt="Image"
                                width="140"
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover'
                                }}
                                image={ rating.album.imageUrl }
                                title={ rating.album.name }
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
                                { rating.album.name }
                            </Typography>
                            <Typography 
                                color={"#E3E3E3"}
                                style={{
                                    fontFamily: 'Josefin, sans-serif',
                                    fontSize: '15px',
                                }}
                            >
                                { rating.album.artist }
                            </Typography>
                            <Box>
                                {starsArray.map((index) => {
                                    return (
                                        <StarIcon key={index} sx={{color:"yellow", fontSize:"10px"}}/>
                                    )
                                })}
                            </Box>
                        </CardContent>
                    </Card>
                )
            })}
        </Box>
    );
}
 
export default LatestRatings;