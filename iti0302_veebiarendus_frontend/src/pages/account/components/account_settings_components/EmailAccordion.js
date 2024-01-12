import { Accordion, AccordionDetails, AccordionSummary, Box, Button, TextField, Typography } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../constants/Constants";

const EmailAccordion = ({textFieldStyle, buttonStyle, setAlertOpen, setAlertText, setAlertSeverity}) => {

    const [fieldValue, setFieldValue] = useState("");

    function validateEmail(email) {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    }

    const handleSubmit = async () => {
        if (validateEmail(fieldValue)) {
            const requestBody = {
                "newEmail": fieldValue
            }
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            }
            try {
                await axios.put(`${API_BASE_URL}/user/email`, requestBody, config);
                setFieldValue("");
                setAlertText("Email address succesfully updated");
                setAlertSeverity("success");
                setAlertOpen(true);
            } catch (error) {
                setAlertText(error.response.data.message);
                setAlertSeverity("error");
                setAlertOpen(true);
                console.log(error.message);
            }
        } else {
            setAlertText("Failed to register account: Invalid email");
            setAlertSeverity("error");
            setAlertOpen(true);
        }
    }

    return (
        <Box>
            <Accordion
                sx={{
                    mb:'30px'
                }}
            >
                <AccordionSummary
                    expandIcon={<EmailIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography
                        style={{
                            fontFamily: 'Josefin, sans-serif',
                            fontSize: '22px',
                        }}
                    >
                        Change Your Email
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
                        New email:
                    </Typography>
                    <TextField
                        value={fieldValue}
                        onChange={(e) => setFieldValue(e.target.value)}
                        autoComplete="off"
                        type="text"
                        sx={textFieldStyle}
                        fullWidth
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}      
                    >                        
                        <Button
                            onClick={handleSubmit}
                            variant="outlined"
                            style={buttonStyle}
                        >
                            Change email
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
 
export default EmailAccordion;