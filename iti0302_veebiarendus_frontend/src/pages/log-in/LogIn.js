import { Box, Card, Grid, TextField, Typography, Button, Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constants/Constants";
import { useAuth } from "../components/AuthContext";

const SignIn = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const { login } = useAuth(); 

    const validateUsername = (username) => {
        return username.length > 0;
    }

    const validatePassword = (password) => {
        return password.length > 0;
    }

    const handleInputChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleInputChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    const handleLogin = async () => {
        if (!validateUsername(username)) {
            setAlertText("Failed to log in: Username field is empty");
            setOpenAlert(true);
            return;
        }
        if (!validatePassword(password)) {
            setAlertText("Failed to log in: Password field is empty")
            setOpenAlert(true);
            return;
        }
        const postData = {
            username: username,
            password: password
        }
        
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, postData);
            const user = response.data;
            localStorage.setItem("jwt", user.jwt);
            login(user);

            navigate('/account');
        } catch (error) {
            setAlertText("Login failed");
            setOpenAlert(true);
        }
    }

    const textFieldStyle = {
        minWidth: "400px",
        pb: "20px",
        "& label.Mui-focused": {
          color: "#76826F"
        },
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "#76826F"
          }
        }
      }

    const loginButtonStyle = {
        color: "white",
        borderColor: "white",
        '&:focus': {
            '& .MuiButton-outlined': {
              borderColor: '#76826F',
            },
          },
        '&:hover': {
            borderColor: '#76826F',
        }
    }

    return ( 
        <Box>
            <Snackbar
                open={openAlert}
                autoHideDuration={5000}
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
                backgroundImage: 'linear-gradient(to bottom right, #000000, #76826F)'
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
                Log In
            </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField
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
                        onClick={() => navigate('/sign-up')}
                    >
                        Don't have an account? Sign up
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={handleLogin}
                        variant="outlined"
                        size="large"
                        sx={loginButtonStyle}
                    >
                        Log in
                    </Button>
                </Grid>
            </Grid>
            </Card>
        </Box>
     );
}
 
export default SignIn;