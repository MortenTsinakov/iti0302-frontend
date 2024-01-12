import { Box, Typography } from "@mui/material";
import '../../font.css'
import AlbumSearch from "./components/AlbumSearch";

const MainPage = () => {

    return (
    <Box>
        <img 
            src="test_bg_2.png"
            alt="Main page"
            style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'cover',
                position: 'absolute',
                filter: 'brightness(50%)',
        }}/>
        <Box>
            <Typography
                style={{
                    fontFamily: 'Josefin, sans-serif',
                    fontSize: '22px',
                }}
                sx={{
                    position: 'absolute',
                    maxWidth: '500px',
                    transform: 'translate(calc(50vw - 50% + 125px), 100px)'
                }}
                >
                'The numbers all go to eleven. Look, right across the board, eleven, eleven, eleven and...'
            </Typography>
            <AlbumSearch />
        </Box>
    </Box>
    );
}
 
export default MainPage;