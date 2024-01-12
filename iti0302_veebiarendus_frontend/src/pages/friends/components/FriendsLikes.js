import { Box, Button, ButtonBase, Card, CardMedia, CardContent, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, FRIENDS_PAGE_SIZE } from "../../../constants/Constants";

const FriendsLikes = () => {

    const pageSize = FRIENDS_PAGE_SIZE;
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(false);
    const [likes, setLikes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/like/friends-latest`, {
                    headers: headers,
                    params: {page: page}
                });
                setLikes(l => [...l, ...response.data]);
                if (response.data.length < pageSize) {
                    setLastPage(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchLikes();
    }, [page, pageSize]);

    const navigateToAlbumInfoPage = (album, artist) => {
        navigate(`/album-info?album=${encodeURIComponent(album)}&artist=${encodeURIComponent(artist)}`);
    }

    return (
        <Box
            sx={{
                marginTop: '50px',
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
                        height:'130px',
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
                                width: '130px',
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
                                fontSize: '18px',
                            }}  
                        >
                            <span style={{ fontWeight: 'bold' }}>{like.user.username}</span>

                        </Typography>
                        <FavoriteIcon
                            sx={{
                                color:"red",
                                height:"20px"
                            }}
                        />
                        <Typography
                            style={{
                                fontFamily: 'Josefin, sans-serif',
                                fontSize: '18px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}  
                        >
                            { like.album.name }
                        </Typography>
                        <Typography 
                            color={"#E3E3E3"}
                            style={{
                                fontFamily: 'Josefin, sans-serif',
                                fontSize: '14px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                        >
                            { like.album.artist }
                        </Typography>
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
 
export default FriendsLikes;