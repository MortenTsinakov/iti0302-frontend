import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants/Constants";

import { Box, Typography } from "@mui/material";
import ReviewCard from "./components/ReviewCard";

const Reviews = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            const headers = localStorage.getItem("jwt") ? {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            } : null;
            axios.get(`${API_BASE_URL}/review/my-reviews`, {
                headers: headers
            }).then(
                (response) => setData(response.data)
            )
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <Box>
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
                My reviews
            </Typography>
            { data.map((item, index) => (
                <ReviewCard key={index} item={item} />
            ))}
        </Box>
    );
}
 
export default Reviews;