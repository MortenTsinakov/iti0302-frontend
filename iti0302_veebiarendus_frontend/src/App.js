import './App.css';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

import MainPage from './pages/main-page/MainPage';
import AppDrawer from './pages/components/AppDrawer';

import { ThemeProvider,
         createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Grid } from '@mui/material';
import AboutPage from './pages/about/AboutPage';
import SearchResult from './pages/search-result/SearchResult';
import SignUp from './pages/sign-up/SignUp';
import LogIn from './pages/log-in/LogIn';
import AlbumInfo from './pages/album-info/AlbumInfo';
import { useEffect, useState } from 'react';
import { useAuth } from './pages/components/AuthContext';
import { API_BASE_URL } from './constants/Constants';
import axios from 'axios';
import AccountPage from './pages/account/AccountPage';
import LikedAlbums from './pages/liked-albums/LikedAlbums';
import ListenLater from './pages/listen-later/ListenLater';
import Reviews from './pages/reviews/Reviews';
import FriendsPage from './pages/friends/FriendsPage';
import UserSearchResults from './pages/user-search/UserSearchResults';
import LoadingPage from './pages/components/LoadingPage';
import UserProfilePage from './pages/user-profile/UserProfilePage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ["Lato"].join(","),
  },
});

function App() {

  const {login, logout, isLoggedIn} = useAuth();
  const [ isLoading, setIsLoading ] = useState(true);
  
  useEffect(() => {
    document.title = "OneLouder";
    const checkJWTValidity = async () => {
      if (localStorage.getItem("jwt") == null) {
        setIsLoading(false);
        return;
      }
      try {
        const token = localStorage.getItem("jwt");
        const response = await axios.post(`${API_BASE_URL}/auth/check-auth`, token); // Replace with your secured endpoint
        const user = response.data;
        if (user.jwt == null) {
          logout();
        } else {
          login(user);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    checkJWTValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCorrectComponent = (Component) => {
    if (isLoading) {
      return <LoadingPage />;
    }
    if (isLoggedIn) {
      return <Component />;
    }
    return <Navigate to='/log-in'/>
  }

  return (
    <ThemeProvider
    theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Grid container spacing={0}>
          <Grid item>
            <AppDrawer/>
          </Grid>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path='/search-result' Component={SearchResult} />
          <Route path='/album-info' Component={AlbumInfo} />
          {/* Protected routes */}
          <Route path='/account' element={getCorrectComponent(AccountPage)}/>
          <Route path='/friends' element={getCorrectComponent(FriendsPage)}/>
          <Route path='/user-search' element={getCorrectComponent(UserSearchResults)}/>
          <Route path='/liked-albums' element={getCorrectComponent(LikedAlbums)} />
          <Route path='/listen-later' element={getCorrectComponent(ListenLater)} />
          <Route path='/reviews' element={getCorrectComponent(Reviews)}/>
          <Route path='/user-profile' element={getCorrectComponent(UserProfilePage)}/>
        </Routes>
        </Grid>
      </Router>
    </ThemeProvider>
  );
}

export default App;
