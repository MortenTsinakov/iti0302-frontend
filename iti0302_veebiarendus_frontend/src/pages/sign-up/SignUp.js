import { Box, Card, Grid, TextField, Typography, Button, Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constants/Constants";
import { useAuth } from "../components/AuthContext";

const SignUp = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const { login } = useAuth(); 

    function validateEmail(email) {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    }

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

    function validatePassword(password) {
        const minLength = 8;
        return password.length >= minLength;
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSignUp();
        }
    };

    const handleSignUp = async () => {
        if (!validateUsername(username)) {
            setAlertText("Failed to register account: Make sure that your username contains only alphanumeric characters, underscores or hyphens and is 3-20 chracters long.");
            setOpenAlert(true);
            return;
        }
        if (!validateEmail(email)) {
            setAlertText("Failed to register account: Invalid email");
            setOpenAlert(true);
            return;
        }
        if (!validatePassword(password)) {
            setAlertText("Failed to register an account: Password has to contain at least 8 characters");
            setOpenAlert(true);
            return;
        }
        const postData = {
            username: username,
            password: password,
            email: email
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/sign-up`, postData);
            const user = response.data;
            localStorage.setItem("jwt", user.jwt);
            login(user);
        
            navigate('/account');
        } catch (error) {
            setAlertText(error.response.data.message);
            setOpenAlert(true);
        }
    }

    const handleInputChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const handleInputChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleInputChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };

    const textFieldStyle = {
        minWidth: "400px",
        pb: "20px",
        "& label.Mui-focused": {
          color: "#9D9379"
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#9D9379"
          }
        }
      }

    const registerButtonStyles = {
        color: "white",
        borderColor: "white",
        '&:focus': {
            '& .MuiButton-outlined': {
              borderColor: '#9D9379',
            },
          },
        '&:hover': {
            borderColor: '#9D9379',
        }
    }

    return (
        <Box>
            <Snackbar
                open={openAlert}
                autoHideDuration={8000}
                onClose={handleCloseAlert}
                sx={{
                    transform:"translate(250px)"
                }}
            >
                <Alert onClose={handleCloseAlert} severity="error">
                    { alertText }
                </Alert>
            </Snackbar>
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                objectFit: 'cover',
                position: 'absolute',
                backgroundImage: 'linear-gradient(to bottom right, #000000, #9D9379)',
            }}
            />
            <Card
                variant="outlined"
                sx={{
                    position: 'relative',
                    transform: 'translate(40vw, 25vh)',
                    padding: "50px",
                    backgroundColor: `rgba(0, 0, 0, 0.5)`,
                    borderRadius: "10px",
                }}
            >
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Grid item xs={12}>
                    <Typography
                    style={{
                        fontSize: '22px',
                    }}
                    sx={{
                        pb: "40px"
                    }}
                    >
                    Sign up
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    onChange={handleInputChangeUsername}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type="text"
                    label="username"
                    sx={textFieldStyle}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    onChange={handleInputChangeEmail}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type="email"
                    label="email"
                    sx={textFieldStyle}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    onChange={handleInputChangePassword}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                    type="password"
                    label="password"
                    sx={textFieldStyle}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="text"
                        size="small"
                        sx={{
                            color: "white",
                            mb: "20px"
                        }}
                        onClick={() => navigate('/log-in')}
                    >
                        Already have an account? Log In
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        size="large"
                        sx={registerButtonStyles}
                        onClick={handleSignUp}
                    >
                        Register account
                    </Button>
                </Grid>
            </Grid>
            </Card>
        </Box>
     );
}
 
export default SignUp;