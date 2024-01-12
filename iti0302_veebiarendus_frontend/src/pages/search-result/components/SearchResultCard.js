import { ButtonBase,
         Card,
         CardContent,
         Typography,
         CardMedia, 
         Divider} from "@mui/material";

const SearchResultCard = ({onClick, album, artist, imageUrl}) => {

    const truncateAlbum = (album) => {
        if (album.length > 25) {
            return album.substring(0, 25) + "...";
        }
        return album;
    }

    const truncateArtist = (artist) => {
        if (artist.length > 40) {
            return artist.substring(0, 40) + "...";
        }
        return artist;
    }

    return ( 
        <ButtonBase 
            onClick={onClick}
            sx={{
                display:"flex",
                flexDirection:"column",
                left:"-25%",
                borderRadius:"0px 10px 10px 10px",
            }}
        >
            <Card
                sx={{
                    minWidth:"500px",
                    maxWidth:"500px",
                    display:"flex",
                    borderRadius:"0px 10px 10px 10px",
                    minHeight:"100px",
                    maxHeight:"100px",
                }}
            >
                {imageUrl ? (
                <CardMedia 
                    sx={{
                        height:"100px",
                        width:"100px",
                    }}
                    image={ imageUrl}
                    title={ album }
                />
                ) : null}
                <CardContent
                    sx={{
                        flex:"1 0 auto",
                    }}
                >
                    <Typography
                        style={{
                            fontSize: '25px',
                            marginBottom:"10px",
                        }}  
                    >
                        {truncateAlbum(album)}
                    </Typography>
                    <Divider />
                    <Typography 
                        style={{
                            fontSize:"15px"
                        }}
                    >
                        {truncateArtist(artist)}
                    </Typography>
                </CardContent>
            </Card>
        </ButtonBase>
     );
}
 
export default SearchResultCard;