import LockIcon from '@mui/icons-material/Lock';
import { Accordion, Button, AccordionDetails, AccordionSummary, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../constants/Constants';


const PasswordAccordion = ({textFieldStyle, buttonStyle, setAlertOpen, setAlertText, setAlertSeverity}) => {

    const [currentPasswordField, setCurrentPasswordField] = useState("");
    const [newPasswordField, setNewPasswordField] = useState("");
    const [confirmPasswordField, setConfirmPasswordField] = useState("");

    const validatePasswordLength = () => {
        return newPasswordField.length >= 8;
    }

    const validateNewPasswordMatch = () => {
        return newPasswordField === confirmPasswordField;
    }

    const passwordStaysTheSame = () => {
        return newPasswordField === currentPasswordField;
    }

    const resetFieldValues = () => {
        setCurrentPasswordField("");
        setNewPasswordField("");
        setConfirmPasswordField("");
    }

    const handleSubmit = async () => {
        if (!validatePasswordLength()) {
            setAlertText("Failed to update password: Password has to contain at least 8 characters");
            setAlertSeverity("error")
            setAlertOpen(true);
            return;
        }
        if (!validateNewPasswordMatch()) {
            setAlertText("Failed to update password: New password field and confirm password field don't match");
            setAlertSeverity("error")
            setAlertOpen(true);
            return;
        }
        if (passwordStaysTheSame()) {
            setAlertText("Password not updated: Current password is the same as new password");
            setAlertSeverity("warning")
            setAlertOpen(true);
            return;
        }
        const requestBody = {
            "currentPassword": currentPasswordField,
            "newPassword": newPasswordField
        }
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            }
        }
        try {
            await axios.put(`${API_BASE_URL}/user/password`, requestBody, config);

            resetFieldValues();
            setAlertText("Password succesfully updated");
            setAlertSeverity("success");
            setAlertOpen(true);
        } catch (error) {
            setAlertText(error.response.data.message);
            setAlertSeverity("error");
            setAlertOpen(true);
            console.log(error);
        }
    }

    return (
        <Accordion
            sx={{
                mb:'30px'
            }}
        >
            <AccordionSummary
                expandIcon={<LockIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography
                    style={{
                        fontFamily: 'Josefin, sans-serif',
                        fontSize: '22px',
                    }}
                >
                    Change Your Password
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
                    Current password:
                </Typography>
                <TextField
                    value={currentPasswordField}
                    onChange={(e) => setCurrentPasswordField(e.target.value)}
                    autoComplete="off"
                    type="password"
                    sx={textFieldStyle}
                    fullWidth
                />
                <Typography
                    style={{
                        fontFamily: 'Josefin, sans-serif',
                        fontSize: '18px',
                        marginBottom:'5px',
                        marginLeft:'5px'
                    }}
                >                         
                    New password:
                </Typography>
                <TextField
                    value={newPasswordField}
                    onChange={(e) => setNewPasswordField(e.target.value)}
                    autoComplete="off"
                    type="password"
                    sx={textFieldStyle}
                    fullWidth
                />
                <Typography
                    style={{
                        fontFamily: 'Josefin, sans-serif',
                        fontSize: '18px',
                        marginBottom:'5px',
                        marginLeft:'5px'
                    }}
                >                         
                    Confirm new password:
                </Typography>
                <TextField
                    value={confirmPasswordField}
                    onChange={(e) => setConfirmPasswordField(e.target.value)}
                    autoComplete="off"
                    type="password"
                    sx={textFieldStyle}
                    fullWidth
                />
                <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    style={buttonStyle}
                >
                    Change Password
                </Button>
            </AccordionDetails>
        </Accordion>
);
}
 
export default PasswordAccordion;