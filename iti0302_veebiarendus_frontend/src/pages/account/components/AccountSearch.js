import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccountSearch = () => {

    const navigate = useNavigate();

    const buttonStyle = {
        margin:'20px',
        color:'white',
        borderColor:'white',
        '&:focus': {
            '& .MuiButton-outlined': {
              borderColor: 'gray',
            },
          },
        '&:hover': {
            borderColor: 'gray',
        }
    }

    const handleClick = (page) => {
        navigate(page);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Button
                onClick={() => handleClick('/')}
                variant="outlined"
                sx={buttonStyle}
            >
                Search for albums
            </Button>
            <Button
                onClick={() => handleClick('/friends')}
                variant="outlined"
                sx={buttonStyle}
            >
                Search for people
            </Button>
        </Box>
    );
}
 
export default AccountSearch;