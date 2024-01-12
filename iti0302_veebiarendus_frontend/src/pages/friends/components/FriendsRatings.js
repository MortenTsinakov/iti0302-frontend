import { Box, Button, ButtonBase, Card, CardMedia, CardContent, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";
import { API_BASE_URL, FRIENDS_PAGE_SIZE } from "../../../constants/Constants";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FriendsRatings = () => {

    const pageSize = FRIENDS_PAGE_SIZE;
    const [ratings, setRatings] = useState([]);
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/rate/friends-latest`, {
                    headers: headers,
                    params: {page: page}
                });
                setRatings(l => [...l, ...response.data]);
                if (response.data.length < pageSize) {
                    setLastPage(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchRatings();
    }, [page, pageSize]);

    const navigateToAlbumInfoPage = (album, artist) => {
        navigate(`/album-info?album=${encodeURIComponent(album)}&artist=${encodeURIComponent(artist)}`);
    }

    return (
        <Box
            sx={{
                marginTop: '50px'
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
                            height:'130px',
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
                                    width: '130px',
                                    height: '130px',
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
                                    fontSize: '18px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }} 
                            >
                                {rating.score}/10 by <span style={{ fontWeight: 'bold' }}>{rating.user.username}</span>
                            </Typography>
                            <Box>
                                {starsArray.map((index) => {
                                    return (
                                        <StarIcon key={index} sx={{color:"yellow", fontSize:"10px"}}/>
                                    )
                                })}
                            </Box>
                            <Typography
                                style={{
                                    fontFamily: 'Josefin, sans-serif',
                                    fontSize: '18px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}  
                            >
                                { rating.album.name }
                            </Typography>
                            <Typography 
                                color={"#E3E3E3"}
                                style={{
                                    fontFamily: 'Josefin, sans-serif',
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}
                            >
                                { rating.album.artist }
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
 
export default FriendsRatings;