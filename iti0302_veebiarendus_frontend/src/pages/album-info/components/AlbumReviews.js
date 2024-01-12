import { Box, Button, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider, InputLabel, TextField, Typography } from "@mui/material";
import { useAuth } from "../../components/AuthContext";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/Constants";

const AlbumReviews = ({ id, reviews, userReviewInit }) => {

    const reviewList = reviews;
    const { username, isLoggedIn} = useAuth();
    const [userReview, setUserReview] = useState(userReviewInit);
    const [disableReviewBox, setDisableReviewBox] = useState(userReviewInit !== "");
    const [textFieldValue, setTextFieldValue] = useState(userReviewInit);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDeleteDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    }

    const isValidReview = (review) => {
        return (
            review.length < 255 && 
            review.length > 0
        );
    }

    const handleEditClick = () => {
        setDisableReviewBox(!disableReviewBox);
    }

    const postReview = async (reviewToPost) => {
        const postData = {
            "albumId": id,
            "text": reviewToPost
        }
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/review`, postData, {headers: headers});
            setTextFieldValue(response.data.text);
        } catch (error) {
            console.log(error);
        }
    }

    const updateReview = async (reviewToPost) => {
        const requestBody = {
            "albumId": id,
            "text": reviewToPost
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        }
        try {
            const response =  await axios.put(`${API_BASE_URL}/review`, requestBody, config);
            setTextFieldValue(response.data.text);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePostClick = async () => {
        const reviewToPost = textFieldValue.trim();
        if (isValidReview(reviewToPost)) {
            if (reviewToPost === userReview) {
                setTextFieldValue(userReview);
                setDisableReviewBox(true);
                return;
            }
            if (userReview === "" ) {
                await postReview(reviewToPost);
            } else {
                await updateReview(reviewToPost);
            }
            setUserReview(reviewToPost);
            setDisableReviewBox(true);
        } else {
            console.log("POST REQUEST FAILED: value not changed")
        }
    }

    const handleCancelClick = () => {
    
        setTextFieldValue(userReview);
        setDisableReviewBox(userReview === "" ? false : true);
    }

    const handleDeleteClick = async () => {
        const postData = {
            "albumId": id
          };
          const config = {
            method: 'DELETE',  // Use the DELETE method
            url: `${API_BASE_URL}/review`,
            data: postData,     // Include data in the request
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("jwt")}`  // Include the JWT token as a Bearer token
            }
          };
        
          try {
            await axios(config); // Send the DELETE request
            setUserReview("");
            setTextFieldValue("");
            setDisableReviewBox(false);
            setOpenDeleteDialog(false);
          } catch (error) {
            console.log(error);
          }
    }

    const buttonStyle = {
        color: "#DADADA",
        borderColor: "#DADADA",
        '&:focus': {
            '& .MuiButton-outlined': {
              borderColor: '#76826F',
            },
          },
        '&:hover': {
            borderColor: '#76826F',
        }
    }

    const ReviewCard = ( {review} ) => {
        if (review.user.username === username) {
            return;
        }
        return (
            <Card
                sx={{
                    pt:'5px',
                    pb:'5px',
                    pl:'15px',
                    pr:'15px',
                    mb:'40px'
                }}
            >
                <CardContent>
                    <Typography
                        variant="h6" component="div"
                        sx={{
                            pb:'10px'
                        }}
                    >
                        {review.user.username}
                    </Typography>
                    <Divider/>
                    <Typography
                        color={"#B3B3B3"}
                        sx={{
                            pt:'15px',
                        }}
                    >
                        {review.text}
                    </Typography>
                </CardContent>
            </Card>
        )
    }

    const ReviewTextBox = () => {
        if (disableReviewBox) {
            return (
                <Box>
                    <InputLabel
                        sx={{
                            mb:'5px'
                        }}
                    >
                        Your Review
                    </InputLabel>
                    <Card
                        sx={{
                            pt:'5px',
                            pb:'5px',
                            pl:'15px',
                            pr:'15px',
                            mb:'10px'
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="h6" component="div"
                                sx={{
                                    pb:'10px'
                                }}
                            >
                                {username}
                            </Typography>
                            <Divider/>
                            <Typography
                                color={"#B3B3B3"}
                                sx={{
                                    pt:'15px'
                                }}
                            >
                                {textFieldValue}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Button
                        variant="outlined"
                        style={buttonStyle}
                        onClick={handleEditClick}
                        sx={{
                            mb:'75px',
                            mr:'15px'
                        }}
                    > 
                        Edit 
                    </Button>
                    <Button
                        variant="outlined"
                        style={buttonStyle}
                        onClick={handleOpenDialog}
                        sx={{
                            mb:'75px',
                            backgroundColor:"#990000"
                        }}
                    > 
                        Delete 
                    </Button>
                </Box>
            )
        }
        return (
            <Box>
                <InputLabel
                    sx={{
                        mb:'5px'
                    }}
                >
                    Write a review
                </InputLabel>
                <InputLabel
                    sx={{
                        color:"red"
                    }}
                >
                    { textFieldValue.length > 255 && "The length of the review is too long!" }
                </InputLabel>
                <TextField
                    value={textFieldValue}
                    onChange={(e) => setTextFieldValue(e.target.value)}
                    multiline
                    rows={5}
                    sx={{
                        width:'100%',
                        mb:'10px',
                        "& label.Mui-focused": {
                            color: "#005B62"
                          },
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "#005B62"
                            }
                          }
                    }}
                />
                <Button
                    variant="outlined"
                    style={buttonStyle}
                    onClick={handlePostClick}
                    sx={{
                        mb:'75px',
                        mr:'15px',
                        backgroundColor:'#005B62'
                    }}
                > 
                    Post 
                </Button>
                <Button
                    variant="outlined"
                    style={buttonStyle}
                    onClick={handleCancelClick}
                    sx={{
                        mb:'75px'
                    }}
                > 
                    Cancel 
                </Button>
            </Box>
        );
    }

    return ( 
        <Box
            sx={{
                width:'50vw',
                margin:'50px',
                borderRadius:"10px",
            }}
        >
            <Typography
                component="div"
                fontSize="25px"
                align="center"
                pb='50px'
                >
                Reviews
            </Typography>
            { isLoggedIn && ReviewTextBox() }
            <Box>
            {reviewList != null ? (
                reviewList.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                    ))
                    ) : (
                        <Typography
                        align={'center'}
                        >
                    No reviews yet
                </Typography>
            )}
            </Box>
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDialog}
                PaperProps={{ style: { padding:"z0px" } }}
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this review?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDeleteClick}
                        color="primary"
                        autoFocus
                        sx={{
                            backgroundColor:"#A6474E",
                            color:"white"
                        }} 
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={handleCloseDialog}   
                    >
                    Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
     );
}
 
export default AlbumReviews;