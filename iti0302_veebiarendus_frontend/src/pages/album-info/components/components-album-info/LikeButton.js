import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios";
import { API_BASE_URL } from "../../../../constants/Constants";
import { useState } from 'react';
import { Tooltip, IconButton } from '@mui/material';


const LikeButton = ({id, likeInit}) => {

    const [like, setLike] = useState(likeInit);

    const likeAlbum = async () => {
        const postData = {
            "albumId": id
        }
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/like`, postData, {headers: headers});
            setLike(response.data.liked);
        } catch (error) {
            console.log(error);
        }
    }

    const unlikeAlbum = async () => {
        const postData = {
          "albumId": id
        };
        const config = {
          method: 'DELETE',  // Use the DELETE method
          url: `${API_BASE_URL}/like`,
          data: postData,     // Include data in the request
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`  // Include the JWT token as a Bearer token
          }
        };
      
        try {
          const response = await axios(config); // Send the DELETE request
          setLike(response.data.liked);
        } catch (error) {
          console.log(error);
        }
      };

    const handleLikeButtonClick = async () => {
        if (!like) {
            likeAlbum();
        } else {
            unlikeAlbum();
        }
    }

    return (
        <Tooltip
            title={like ? "Remove from Favorites" : "Add to Favorites"}
        >
            <IconButton 
                aria-label="Add to Favorites"
                onClick={handleLikeButtonClick}
                sx={{
                    color: (like ? 'red' : 'primary')
                }}
            >
                {like ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
        </Tooltip>
    );
}
 
export default LikeButton;