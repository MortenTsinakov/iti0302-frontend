import {
    Drawer,
    Divider,
    Button,
  } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleICon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import HeadPhonesIcon from '@mui/icons-material/Headphones'
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';
import Logo from "./Logo";
import axios from "axios";
import { API_BASE_URL } from "../../constants/Constants";

const userNavButtons = [
    { name: "Log In", icon: <LoginIcon/>, link: '/log-in'},
    { name: "Sign Up", icon: <PersonAddIcon/>, link: '/sign-up'}
]

const loggedInUserNavButtons = [
    { name: "Friends", icon: <GroupIcon/>, link: '/friends' },
    { name: "My reviews", icon: <StarIcon />, link: '/reviews' },
    { name: "Liked albums", icon: <FavoriteIcon />, link: '/liked-albums'},
    { name: "Listen later", icon: <HeadPhonesIcon/>, link: '/listen-later' },
    { name: "Account", icon: <AccountCircleICon />, link: '/account'}
]


const AppDrawer = () => {
    const navigate = useNavigate();
    const {isLoggedIn, logout} = useAuth();

    const getHomeNav = () => {
        return <Button
                        variant="text"
                        size="large"
                        startIcon={<HomeIcon />}
                        style={{
                            justifyContent: "flex-start",
                            textTransform: "none"
                        }}
                        sx={{
                            color: "white",
                            mb: "20px",
                            pl: "30px"
                        }}
                        onClick={() => navigate('/')}
                    >
                        Home
                    </Button>
    }
    
    const getUserNav = () => (
        <>
        {userNavButtons.map((item, index) => (
            <Button
                variant="text"
                size="large"
                startIcon={item.icon}
                key={index}
                style={{
                    justifyContent: "flex-start",
                    textTransform: "none"
                }}
                sx={{
                    color: "white",
                    mb: "20px",
                    pl: "30px"
                }}
                onClick={() => navigate(item.link)}
            >
                {item.name}
            </Button>
        ))}
        </>
    );

    const getLoggedInUserNav = () => (
        <>
        {loggedInUserNavButtons.map((item, index) => (
            <Button
                variant="text"
                size="large"
                startIcon={item.icon}
                key={index}
                style={{
                    justifyContent: "flex-start",
                    textTransform: "none"
                }}
                sx={{
                    color: "white",
                    mb: "20px",
                    pl: "30px"
                }}
                onClick={() => navigate(item.link)}
            >
                {item.name}
            </Button>
        ))}
        </>
    );

    const getAboutNav = () => {
        return  <Button
                    variant="text"
                    size="large"
                    startIcon={<InfoIcon />}
                    style={{
                        justifyContent: "flex-start",
                        textTransform: "none"
                    }}
                    sx={{
                        color: "white",
                        mb: "20px",
                        pl: "30px"
                    }}
                    onClick={() => navigate('/about')}
                >
                    About
                </Button>
    }

    const getLogoutButton = () => {
        return <Button
                    variant="text"
                    size="large"
                    startIcon={<LogoutIcon/>}
                    style={{
                        justifyContent: "flex-start",
                        textTransform: "none"
                    }}
                    sx={{
                        color: "white",
                        mb: "20px",
                        pl: "30px"
                    }}
                    onClick={handleLogOut}
                >
                    Logout
                </Button>
    }

    const handleLogOut = async () => {
        try {
            await axios.post(`${API_BASE_URL}/auth/logout`);
            localStorage.clear();
            logout();
            navigate("/");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <Drawer
        variant="permanent"
        anchor="left"
        sx={{
            '& .MuiDrawer-paper': {
              backgroundColor: `rgba(0, 0, 0, 0.5)`,
              width: '250px',
            },
          }}
        >
        <Logo />
        {getHomeNav()}
        <Divider />
        {!isLoggedIn && getUserNav()}
        {isLoggedIn && getLoggedInUserNav()}
        {isLoggedIn && getLogoutButton()}
        <Divider />
        {getAboutNav()}
        </Drawer>
    );
}
 
export default AppDrawer;