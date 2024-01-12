import { Box, Button, ButtonBase, Card, CardMedia, CardContent, Dialog, DialogContent, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { FRIENDS_PAGE_SIZE } from "../../../constants/Constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/Constants";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const FriendsReviews = () => {

    const pageSize = FRIENDS_PAGE_SIZE;
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(0);
    const [lastPage, setLastPage] = useState(false);
    const navigate = useNavigate();

    const [reviewText, setReviewText] = useState("");
    const [reviewAlbum, setReviewAlbum] = useState("");
    const [reviewArtist, setReviewArtist] = useState("");
    const [reviewUsername, setReviewUsername] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/review/friends-latest`, {
                    headers: headers,
                    params: {page: page}
                });
                setReviews(r => [...r, ...response.data]);
                if (response.data.length < pageSize) {
                    setLastPage(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchReviews();
    }, [page, pageSize])

    const handleOpen = (review) => {
        setReviewText(review.text);
        setReviewAlbum(review.album.name);
        setReviewArtist(review.album.artist);
        setReviewUsername(review.user.username);
        setOpen(true);
    }

    const handleClose = () => {
        setReviewText("");
        setReviewAlbum("");
        setReviewArtist("");
        setReviewUsername("");
        setOpen(false);
    }

    const navigateToAlbumInfoPage = (album, artist) => {
        navigate(`/album-info?album=${encodeURIComponent(album)}&artist=${encodeURIComponent(artist)}`);
    }

    return (
        <Box
            sx={{
                marginTop: '50px'
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
                        { reviewUsername }
                    </Typography>
                </DialogContent>
            </Dialog>
            {reviews.map((review, index) => {
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
                            onClick={() => navigateToAlbumInfoPage(review.album.name, review.album.artist)}
                        >
                            {review.album.imageUrl ? (
                            <CardMedia
                                component="img"
                                alt="Image"
                                width="140"
                                style={{
                                    width: '130px',
                                    height: '130px',
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
                                    fontSize: '18px',
                                }}  
                            >
                            Review by <span style={{ fontWeight: 'bold' }}>{review.user.username}</span>
                            </Typography>
                            <Typography
                                style={{
                                    fontFamily: 'Josefin, sans-serif',
                                    fontSize: '18px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}  
                            >
                                { review.album.name }
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
                                { review.album.artist }
                            </Typography>
                                <IconButton
                                    onClick={() => handleOpen(review)}
                                >
                                    <Typography
                                        color={"#E3E3E3"}
                                        style={{
                                            fontFamily: 'Josefin, sans-serif',
                                            fontSize: '14px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                        sx={{
                                            ml: '-6px'
                                        }}
                                    >
                                        {<LibraryBooksIcon 
                                        sx={{fontSize:"20px"}}    
                                    />} <span style={{ fontWeight: 'bold' }}> Read review </span>
                                    </Typography>
                                </IconButton>
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
 
export default FriendsReviews;