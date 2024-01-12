import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CreateIcon from '@mui/icons-material/Create';
import FavoriteIcon from '@mui/icons-material/Favorite';

const AboutPage = () => {

    const iconStyle = {
        height:"40px",
        width:"40px",
        mr:"20px",
        ml:"20px",
        mt:"20px"
    }

    const cards = [
        { name: "Like Albums", icon: <FavoriteIcon sx={iconStyle} />, text: 'Quickly bookmark albums you enjoy. Liking an album is a simple way to build a collection of your favorites for easy reference.'},
        { name: "Rate Albums", icon: <StarIcon sx={iconStyle}/>, text: 'Assign numerical ratings to albums to quantify your level of enjoyment. It provides a systematic way to gauge your preferences and helps others understand your taste.' },
        { name: "Review Albums", icon: <CreateIcon sx={iconStyle}/>, text: 'Share detailed thoughts on albums. Writing reviews adds depth to your music preferences, offers insights to other users, and contributes to a community dialogue about different music styles.'},
        { name: "Mark Albums for Later Listening", icon: <AccessTimeFilledIcon sx={iconStyle}/>, text: "Keep track of albums you want to explore further. Marking albums for later listening is a practical feature for users who come across interesting music but don't have the time to delve into it immediately." }
    ]

    const getCard = (item, index) => {
        return (
            <Card
                key={index}
                sx={{
                    transform: 'translate(calc(50vw - 50% + 125px), 300px)',
                    maxWidth:"calc(100vw - 350px)",
                    mb:"50px"
                }}
            >
                <CardContent>
                    <Box 
                        display="flex"
                        alignItems="center"
                    >
                        <Box
                            flexBasis="75px"
                        >
                            {item.icon}
                        </Box>
                        <Box
                            paddingLeft="20px"
                            paddingRight="20px"
                        >
                            <Typography
                                style={{
                                    fontSize: '20px',
                                    whiteSpace: 'pre-wrap'
                                }} 
                            >
                                {item.name}
                            </Typography>
                            <Divider 
                                sx={{
                                    mt:'10px',
                                    mb:'10px'
                                }}
                            />
                            <Typography
                                color={"#B3B3B3"}
                                style={{
                                    fontSize:"15px",
                                    marginBottom:"15px",
                                    whiteSpace: 'pre-wrap'
                                }}
                            >
                                {item.text}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        )
    }

    return (
        <Box>
            <Typography
                style={{
                    fontFamily: 'Josefin, sans-serif',
                    fontSize: '22px',
                }}
                sx={{
                    position: 'absolute',
                    transform: 'translate(calc(50vw - 50% + 125px), 50px)'
                }}
            >
                Welcome to OneLouder!
            </Typography>
            <Typography
                style={{
                    fontFamily: 'Josefin, sans-serif',
                    fontSize: '18px',
                    
                }}
                sx={{
                    position: 'absolute',
                    transform: 'translate(calc(50vw - 50% + 125px), 150px)',
                    maxWidth: 'calc(100% - 400px)'
                }}
            >
                OneLouder is a music app designed for enthusiasts who want a straightforward way to manage their music preferences.
            </Typography>
            { cards.map((item, index) => (
                getCard(item, index)
            ))}
        </Box>
     );
}
 
export default AboutPage;