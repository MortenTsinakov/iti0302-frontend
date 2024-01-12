import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../constants/Constants";
import { useAuth } from "../../../components/AuthContext";
import { useNavigate } from "react-router-dom";

const DeleteAccountAccordion = ({setAlertOpen, setAlertText, setAlertSeverity}) => {

    const [fieldValue, setFieldValue] = useState("");
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleDeleteClick = async () => {
        if (fieldValue.length < 1) {
            handleCloseDialog();
            setAlertText("Please fill in the password field");
            setAlertSeverity("warning");
            setAlertOpen(true);
            return;
        }
        const postData = {
            "password": fieldValue
          };
          const config = {
            method: 'DELETE',
            url: `${API_BASE_URL}/user/delete`,
            data: postData,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("jwt")}`  // Include the JWT token as a Bearer token
            }
          };
        
          try {
            await axios(config);
            setFieldValue("");
            setOpenDeleteDialog(false);
            localStorage.clear();
            logout();
            navigate("/");
          } catch (error) {
            setAlertText(error.response.data.message);
            setAlertSeverity("error");
            setAlertOpen(true);
            setOpenDeleteDialog(false);
            console.log(error);
          }
    }

    const handleOpenDialog = () => {
        setOpenDeleteDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDeleteDialog(false);
    }

    const textFieldStyle = {
        pb: "20px",
        "& label.Mui-focused": {
          color: "gray"
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "gray"
          }
        }
    }

    const buttonStyle = {
        color:'red',
        borderColor:'red',
        '&:focus': {
            '& .MuiButton-outlined': {
              borderColor: 'red',
            },
          },
        '&:hover': {
            borderColor: 'red',
        }
    }

    return (
        <Box>
             <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDialog}
                PaperProps={{ style: { padding:"z0px" } }}
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete Account"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete your account?
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
            <Accordion
                sx={{
                    mb:'30px'
                }}
            >
                <AccordionSummary
                    expandIcon={<DeleteIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography
                        style={{
                            fontFamily: 'Josefin, sans-serif',
                            fontSize: '22px',
                            color: 'red'
                        }}
                    >
                        Delete Your Account
                    </Typography>      
                </AccordionSummary>
                <AccordionDetails>
                    <Typography
                        style={{
                            fontFamily: 'Josefin, sans-serif',
                            fontSize: '18px',
                            marginBottom:'5px',
                            marginLeft:'5px'
                        }}
                    >                         
                        Type your password:
                    </Typography>
                    <TextField
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                        autoComplete="off"
                        type="password"
                        sx={textFieldStyle}
                        fullWidth
                    />
                    <Button
                        onClick={handleOpenDialog}
                        variant="outlined"
                        style={buttonStyle}
                    >
                        Delete account
                    </Button>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
 
export default DeleteAccountAccordion;