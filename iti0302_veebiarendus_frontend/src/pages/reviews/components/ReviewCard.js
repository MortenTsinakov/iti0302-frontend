import { Box, ButtonBase, Card, CardContent, CardMedia, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({item}) => {

    const navigate = useNavigate();

    const handleAlbumclick = async (name, artist) => {
        navigate(`/album-info?album=${encodeURIComponent(name)}&artist=${encodeURIComponent(artist)}`);
    }

    const truncateArtist = (artist) => {
        if (artist.length > 40) {
            return artist.substring(0, 40) + "...";
        }
        return artist;
    }

    return (
        <ButtonBase 
            onClick={() => handleAlbumclick(item.album.name, item.album.artist)}
            sx={{
                display:"flex",
                flexDirection:"column",
                borderRadius:"0px 10px 10px 10px",
                minWidth:"500px",
                width:"50vw",
                minHeight:"200px",
                maxHeight:"200px",
                marginBottom:"30px",
                transform: 'translate(calc(50vw - 50% + 125px), 150px)'
            }}
        >
            <Card
                sx={{
                    minWidth:"500px",
                    width:"50vw",
                    display:"flex",
                    borderRadius:"0px 10px 10px 10px",
                }}
            >
                { item.album.imageUrl ? (
                <CardMedia 
                    sx={{
                        height:"200px",
                        width:"200px",
                    }}
                    image={ item.album.imageUrl}
                    title={ item.album.name }
                />
                ) : null}
                <CardContent
                    sx={{
                        flex:"1 0 auto",
                    }}
                >
                    <Typography
                        style={{
                            fontSize: '20px',
                            paddingLeft: '20px',
                            whiteSpace: 'nowrap',
                            maxWidth: 'calc(50vw - 300px)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}  
                    >
                        { item.album.name }
                    </Typography>
                    <Typography 
                        style={{
                            fontSize:"15px",
                            marginBottom:"15px",
                            paddingLeft: '20px',
                            whiteSpace: 'nowrap',
                            maxWidth: 'calc(50vw - 300px)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        { truncateArtist(item.album.artist) }
                    </Typography>
                    <Divider />
                    <Box
                        sx={{
                            paddingRight:"25px",
                            maxWidth:"calc(50vw - 230px)",
                            maxHeight:"100px",
                            overflow:"auto"
                        }}
                    >
                        <Typography
                            color={"#B3B3B3"}
                            style={{
                                marginTop:"15px",
                                fontSize:"15px",
                            }}
                        >
                            { item.text }
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </ButtonBase>
    );
}
 
export default ReviewCard;