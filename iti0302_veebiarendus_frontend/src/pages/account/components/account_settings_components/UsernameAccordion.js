import { Accordion, AccordionDetails, AccordionSummary, Button, TextField, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../constants/Constants';
import { useAuth } from '../../../components/AuthContext';

const UsernameAccordion = ({textFieldStyle, buttonStyle, setAlertOpen, setAlertText, setAlertSeverity}) => {

    const [fieldValue, setFieldValue] = useState("");
    const { login } = useAuth();

    function validateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    
        const minLength = 3;
        const maxLength = 20;
    
        return (
            usernameRegex.test(username) &&
            username.length >= minLength &&
            username.length <= maxLength
        );
    }

    const handleSubmit = async () => {
        if (validateUsername(fieldValue)) {
            const requestBody = {
                "newUsername": fieldValue
            }
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt")}`
                }
            }
            try {
                const response = await axios.put(`${API_BASE_URL}/user/username`, requestBody, config);

                const user = response.data;
                localStorage.setItem("jwt", user.jwt);
                login(user);

                setFieldValue("");
                setAlertText("Username succesfully updated");
                setAlertSeverity("success");
                setAlertOpen(true);
            } catch (error) {
                setAlertText(error.response.data.message);
                setAlertSeverity("error");
                setAlertOpen(true);
            }
        } else {
            setAlertText("Failed to update username: Make sure that your username contains only alphanumeric characters, underscores or hyphens and is 3-20 chracters long.");
            setAlertSeverity("error");
            setAlertOpen(true);
        }
    }

    return (
        <Accordion
            sx={{
                mb:'30px'
            }}
        >
            <AccordionSummary
                expandIcon={<PersonIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography
                    style={{
                        fontFamily: 'Josefin, sans-serif',
                        fontSize: '22px',
                    }}
                >
                    Change Your Username
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
                    New username:
                </Typography>
                <TextField
                    value={fieldValue}
                    onChange={(e) => setFieldValue(e.target.value)}
                    autoComplete="off"
                    type="text"
                    sx={textFieldStyle}
                    fullWidth
                />
                <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    style={buttonStyle}
                >
                    Change username
                </Button>
            </AccordionDetails>
        </Accordion>
    );
}
 
export default UsernameAccordion;