import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import AlbumInfoCard from "./components/AlbumInfoCard";
import AlbumReviews from "./components/AlbumReviews";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants/Constants";
import LoadingPage from "../components/LoadingPage";

const AlbumInfo = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const album = searchParams.get('album');
    const artist = searchParams.get('artist');
    const [albumInfo, setAlbumInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (album === null || artist === null || album.trim() === '' || artist.trim() === '') {
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const headers = localStorage.getItem("jwt") ? {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                } : null;
                const response = await axios.get(`${API_BASE_URL}/album/info`, {
                    headers: headers,
                    params: {album: album,
                             artist: artist}
                });
                setAlbumInfo(response.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
      }, [album, artist]);

    return loading ? <LoadingPage /> : albumInfo != null ? (
            <Box
            sx={{
                transform:"translate(250px)",
                display:'flex',
                flexWrap:'wrap'
            }}
            >
            <Box
                sx={{
                    boxSizing:'border-box'
                }}
                >
                <AlbumInfoCard 
                    id={albumInfo.id}
                    tracks={albumInfo.trackList}
                    imageUrl={albumInfo.imageUrl}
                    album={albumInfo.name}
                    artist={albumInfo.artist}
                    likeInit={albumInfo.userInfo.like}
                    listenLaterInit={albumInfo.userInfo.listenLater}
                    ratingInit={albumInfo.userInfo.rating}
                    nrOfRatingsInit={albumInfo.stats !== null ? albumInfo.stats.nrOfRatings : 0}
                    sumOfRatingsInit={albumInfo.stats !== null ? albumInfo.stats.sumOfRatings : 0}
                />
                </Box>
                <Box
                sx={{
                    boxSizing:'border-box'
                }}
            >
                <AlbumReviews
                    id={albumInfo.id}
                    reviews={albumInfo.reviews}
                    userReviewInit={albumInfo.userInfo.review !== null ? albumInfo.userInfo.review : ""}
                />
                </Box>
                </Box>
     )
     :
     (<Box>
        <Typography
            style={{
                fontFamily: 'Josefin, sans-serif',
                fontSize: '22px',
            }}
            sx={{
                position: 'absolute',
                maxWidth: '500px',
                transform: 'translate(calc(50vw - 50% + 125px), 50px)'
            }}
        >
            Sorry, we couldn't find what you were looking for...
        </Typography>
     </Box>);
}
 
export default AlbumInfo;