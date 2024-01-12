import { TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FriendsSearch = () => {

    const [searchedUser, setSearchedUser] = useState('');
    const navigate = useNavigate();

    const handleSearch = async() => {
        if (searchedUser !== null && searchedUser.trim() !== '') {
            navigate(`/user-search?user=${encodeURIComponent(searchedUser)}`);
        }
    };

    const handleInputChange = (e) => {
        setSearchedUser(e.target.value);
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
        backgroundColor: "rgb(255, 255, 255, 0.1)",
        // marginTop: "150px"
    }

    return (
        <TextField
            type="search"
            label="Search for other users..."
            variant="outlined"
            autoComplete="off"
            value={searchedUser}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            sx={textFieldStyle}
        >
        </TextField>
    );
}
 
export default FriendsSearch;