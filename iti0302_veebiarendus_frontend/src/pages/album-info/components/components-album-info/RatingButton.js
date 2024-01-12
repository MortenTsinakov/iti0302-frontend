import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../constants/Constants";
import StarOutlineSharpIcon from '@mui/icons-material/StarOutlineSharp';
import StarIcon from '@mui/icons-material/Star';
import { Grid, IconButton, Typography } from "@mui/material";

const RatingButton = ({id, ratingInit, nrOfRatingsInit, sumOfRatingsInit}) => {

    const [rating, setRating] = useState(ratingInit);
    const [nrOfRatings, setNrOfRatings] = useState(nrOfRatingsInit);
    const [sumOfRatings, setSumOfRatings] = useState(sumOfRatingsInit);

    const rateAlbum = async(score) => {
        const postData = {
            "albumId": id,
            "rating": score
        }
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/rate`, postData, {headers: headers});
            setRating(response.data.rating);
            const newSum = sumOfRatings + response.data.rating;
            setSumOfRatings(newSum);
            const newAmountOfRatings = nrOfRatings + 1;
            setNrOfRatings(newAmountOfRatings);
        } catch (error) {
            console.log(error);
        }
    }

    const updateAlbumRating = async(score) => {
        const requestBody = {
            "albumId": id,
            "rating": score
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        }
        try {
            const response = await axios.put(`${API_BASE_URL}/rate`, requestBody, config);
            const prevRating = rating;
            setRating(response.data.rating);
            const newSum = sumOfRatings - prevRating + response.data.rating;
            setSumOfRatings(newSum);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRateClick = async (score) => {
        if (rating === 0 || rating == null) {
            rateAlbum(score);
        } else {
            updateAlbumRating(score);
        }
    }

    const getAverageRating = () => {
        if (nrOfRatings !== null && nrOfRatings !== 0) {
            return "Average: " + (sumOfRatings / nrOfRatings).toFixed(1);
        }
        return "No ratings yet"
    }

    return (
        <Grid
            container
            alignItems="center"
        >
            <Grid item xs={10}>
                {Array.from({ length: 10 }, (_, index) => (
                    <IconButton
                        key={index}
                        sx={{
                            pr:"1px",
                            pl:"1px"
                        }}
                        onClick={() => {handleRateClick(index + 1)}}
                    >
                        { index >= rating ?
                        <StarOutlineSharpIcon
                            key={index}
                            sx={{
                                color:"gray",
                                fontSize:"30px"
                            }}
                            />
                        :
                        <StarIcon 
                            key={index}
                            sx={{
                                color:"#DBD100",
                                fontSize:"30px"
                            }}
                        />
                        }
                    </IconButton>
                ))}
            </Grid>
            <Grid item xs={2}>
                <Typography
                    fontSize="12px"
                >
                    {getAverageRating()}
                </Typography>
                <Typography
                    fontSize="10px"
                    color={"#B3B3B3"}
                    marginTop={0.5}
                >
                    Rated { nrOfRatings } {nrOfRatings === 1 ? "time" : "times"}
                </Typography>
            </Grid>
        </Grid>
    );
}
 
export default RatingButton;