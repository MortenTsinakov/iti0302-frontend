import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const Logo = () => {
    const navigate = useNavigate();

    return ( 
        <Button
            disableRipple
            onClick={() => navigate('/')}
            sx={{
                display:"block",
                borderRadius:"10%",
                width:"200px",
                height:"50px",
                ml:"30px",
                mt:"30px",
                mb:"30px",
            }}
            style={{
                backgroundColor:"transparent"
            }}
        >
            <div 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                }}
            >
                <Typography 
                    style={{
                        fontFamily: 'Italiana, sans-serif',
                        fontSize: '30px',
                        fontWeight: "bold",
                        marginTop:"-15px",
                        paddingRight:"5px",
                        color:"#E0E0E0"
                    }}
                >
                    One
                </Typography>
                <Typography 
                    style={{
                        fontFamily: 'Italiana, sans-serif',
                        fontSize: '30px',
                        color:"#E57373",
                        fontWeight:"bold",
                    }}
                >
                    Louder
                </Typography>
            </div>
        </Button>
     );
}
 
export default Logo;