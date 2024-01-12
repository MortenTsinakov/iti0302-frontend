import { Box, CircularProgress } from "@mui/material";

const LoadingPage = () => {
    return (
        <Box
            sx={{
                position:'absolute',
                top:'50%',
                left: '50%'
            }}
        >
            <CircularProgress
                color="inherit"
            />
        </Box>
    );
}
 
export default LoadingPage;