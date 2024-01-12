import { Box, Typography, Grid } from "@mui/material";
import UsernameAccordion from "./account_settings_components/UsernameAccordion";
import EmailAccordion from "./account_settings_components/EmailAccordion";
import PasswordAccordion from "./account_settings_components/PasswordAccordion";
import DeleteAccountAccordion from "./account_settings_components/DeleteAccountAccordion";

const AccountSettings = ({setAlertOpen, setAlertText, setAlertSeverity}) => {

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
        color:'white',
        marginRight:'25px',
        borderColor:'white',
        '&:focus': {
            '& .MuiButton-outlined': {
              borderColor: 'gray',
            },
          },
        '&:hover': {
            borderColor: 'gray',
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Grid
                width='50%'
            >
                <Grid item>
                    <Typography
                        style={{
                            fontFamily: 'Josefin, sans-serif',
                            fontSize: '22px',
                            textAlign: 'center',
                            marginBottom:'50px'
                        }}
                    >
                        Account Settings
                    </Typography>
                </Grid>
                <Grid item>
                    <UsernameAccordion textFieldStyle={textFieldStyle} buttonStyle={buttonStyle} setAlertOpen={setAlertOpen} setAlertText={setAlertText} setAlertSeverity={setAlertSeverity} />
                    <EmailAccordion textFieldStyle={textFieldStyle} buttonStyle={buttonStyle} setAlertOpen={setAlertOpen} setAlertText={setAlertText} setAlertSeverity={setAlertSeverity} />
                    <PasswordAccordion textFieldStyle={textFieldStyle} buttonStyle={buttonStyle} setAlertOpen={setAlertOpen} setAlertText={setAlertText} setAlertSeverity={setAlertSeverity} />
                    <DeleteAccountAccordion setAlertOpen={setAlertOpen} setAlertText={setAlertText} setAlertSeverity={setAlertSeverity} />
                </Grid>
            </Grid>
        </Box>
    );
}
 
export default AccountSettings;