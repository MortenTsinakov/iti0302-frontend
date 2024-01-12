import { Card, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import { useAuth } from "../../components/AuthContext";
import LikeButton from "./components-album-info/LikeButton";
import ListenLaterButton from "./components-album-info/ListenLaterButton";
import RatingButton from "./components-album-info/RatingButton";
import Tracks from "./components-album-info/Tracks";

const AlbumInfoCard = ({id,
                    tracks,
                    imageUrl,
                    album,
                    artist,
                    likeInit,
                    listenLaterInit,
                    ratingInit,
                    nrOfRatingsInit,
                    sumOfRatingsInit
                       }) => {

    const {isLoggedIn} = useAuth();

    const truncateArtist = (artist) => {
        if (artist.length > 40) {
            return artist.substring(0, 40) + "...";
        }
        return artist;
    }

    return (
        <Card
            sx={{
                margin:"50px",
                width:"600px",
                padding:"50px",
                borderRadius:"10px"
            }}
            >
            <CardMedia
                component="img"
                alt="Image"
                height="500"
                width="500"
                image={imageUrl}
                sx={{
                    borderRadius:"10px"
                }}
                />
            <CardContent>
                <Grid
                    container
                    alignContent="center"
                    sx={{
                        pt:"20px",
                        pb:"5px"
                    }}
                >
                    <Grid item
                        xs={6}
                        align="left"
                    >
                        <Typography
                            component="div"
                            fontSize="30px"
                        >
                            { album }
                        </Typography>
                    </Grid>
                    <Grid item 
                        xs={6}
                        align="right"
                    >
                        { isLoggedIn && <ListenLaterButton id={id} listenLaterInit={listenLaterInit} />}
                        { isLoggedIn && <LikeButton id={id} likeInit={likeInit}/> }
                    </Grid>
                </Grid>
                <Typography
                    fontSize="20px"
                    sx={{
                        pb:"10px"
                    }}
                >
                    { truncateArtist(artist) }
                </Typography>
                <Divider />
                { isLoggedIn && <RatingButton id={id} ratingInit={ratingInit} nrOfRatingsInit={nrOfRatingsInit} sumOfRatingsInit={sumOfRatingsInit}/>}
                <Divider />
                {<Tracks tracks={tracks}/>}
            </CardContent>
        </Card>
         );
}
 
export default AlbumInfoCard;