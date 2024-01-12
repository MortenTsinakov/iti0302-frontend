import { API_BASE_URL } from "../../../constants/Constants";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from "@mui/material";

const AlbumSearch = () => {

    const [album, setAlbum] = useState('');
    const navigate = useNavigate();

    const handleSearch = async() => {
        try {
            const response = await axios.get(`${API_BASE_URL}/album/search`, {
                params: {album: encodeURIComponent(album)}
            });
            navigate('/search-result', { state: { result: response.data } });
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setAlbum(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const textFieldStyle = {
        position: "relative",
        minWidth: "500px",
        maxWidth: "500px",
        transform: 'translate(calc(50vw - 50% + 125px), 200px)',
        backgroundColor: "rgb(255, 255, 255, 0.1)"
      }

    return (
        <TextField
                type="search"
                label="Search for albums..."
                variant="outlined"
                autoComplete="off"
                value={album}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                sx={textFieldStyle}
            >
        </TextField>
    );
}
 
export default AlbumSearch;