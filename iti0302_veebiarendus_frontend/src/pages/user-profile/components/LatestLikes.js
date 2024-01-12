import { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, ButtonBase, Card, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/Constants";
import { useNavigate } from "react-router-dom";

const LatestLikes = ({ userId }) => {

    const [likes, setLikes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserLikes = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/like/users-latest`, {
                    headers: headers,
                    params: {user: userId}
                });
                setLikes(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserLikes();
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
                {likes.map((like, index) => {
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
                                onClick={() => navigateToAlbumInfoPage(like.album.name, like.album.artist)}
                            >
                                {like.album.imageUrl ? (
                                <CardMedia 
                                    component="img"
                                    alt="Image"
                                    width="140"
                                    style={{
                                        width: '100px',
                                        objectFit: 'cover'
                                    }}
                                    image={ like.album.imageUrl }
                                    title={ like.album.name }
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
                                    { like.album.name }
                                </Typography>
                                <Typography 
                                    color={"#E3E3E3"}
                                    style={{
                                        fontFamily: 'Josefin, sans-serif',
                                        fontSize: '15px',
                                    }}
                                >
                                    { like.album.artist }
                                </Typography>
                                <FavoriteIcon sx={{color:'red', fontSize:'20px'}}/>
                            </CardContent>
                        </Card>
                    )
                })}
            </Box>
    );
}
 
export default LatestLikes;