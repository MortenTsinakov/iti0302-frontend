import { Box, Typography } from "@mui/material";

const AccountHeader = ({username}) => {
    return (
        <Box>
            <Typography
                style={{
                    fontFamily: 'Josefin, sans-serif',
                    fontSize: '22px',
                    textAlign: 'center'
                }}
                sx={{
                    mt:"50px"
                }}
            >
                Welcome, { username }
            </Typography>
        </Box>
    );
}
 
export default AccountHeader;