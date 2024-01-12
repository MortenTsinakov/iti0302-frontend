import { Alert, Box, Divider, Grid, Snackbar } from "@mui/material";
import { useAuth } from "../components/AuthContext";
import AccountHeader from "./components/AccountHeader";
import AccountStats from "./components/AccountStats";
import AccountSearch from "./components/AccountSearch";
import AccountSettings from "./components/AccountSettings";
import { useState } from "react";

const AccountPage = () => {

    const {username} = useAuth();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");

    const displayAlert = (value) => {
        setOpenAlert(value);
    }

    const alertMessage = (value) => {
        setAlertText(value);
    }

    const alertColor = (value) => {
        setAlertSeverity(value);
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
    };
    
    return ( 
        <Box>
        <Box
            sx={{
                width: 'calc(100vw - 250px)',
                transform: 'translate(250px)',
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Grid
                width='100%'
            >
                <Grid item
                    sx={{
                        mb:"50px"
                    }}
                >
                    <AccountHeader username={username}/>
                </Grid>
                <Grid item>
                    <AccountStats />
                </Grid>
                <Grid item>
                    <AccountSearch />
                </Grid>
                <Divider
                    flexItem
                    variant="middle"
                    color="gray"
                    sx={{
                        marginTop:"20px",
                        marginBottom:"20px"
                    }}
                />
                <AccountSettings setAlertOpen={displayAlert} setAlertText={alertMessage} setAlertSeverity={alertColor}/>
            </Grid>
        </Box>
        <Snackbar
            open={openAlert}
            autoHideDuration={5000}
            onClose={handleCloseAlert}
            message="Message goes here"
            sx={{transform:"translate(250px)"}}
        >
            <Alert severity={alertSeverity}>{alertText}</Alert>
        </Snackbar>
        </Box>
     );
}
 
export default AccountPage;