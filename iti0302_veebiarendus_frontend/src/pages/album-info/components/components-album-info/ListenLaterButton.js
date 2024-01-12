import { IconButton, Tooltip } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../constants/Constants";

const ListenLaterButton = ({id, listenLaterInit}) => {

    const [listenLater, setListenLater] = useState(listenLaterInit);

    const addLaterListen = async () => {
        const postData = {
            "albumId": id
        }
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem("jwt")}`
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/later-listen`, postData, {headers: headers});
            setListenLater(response.data.listenLater);
        } catch (error) {
            console.log(error);
        }
    }

    const removeLaterListen = async () => {
        const postData = {
            "albumId": id
          };
          const config = {
            method: 'DELETE',  // Use the DELETE method
            url: `${API_BASE_URL}/later-listen`,
            data: postData,     // Include data in the request
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("jwt")}`  // Include the JWT token as a Bearer token
            }
          };
        
          try {
            const response = await axios(config); // Send the DELETE request
            setListenLater(response.data.listenLater);
          } catch (error) {
            console.log(error);
          }
    }


    const handleLaterListenButtonClick = async () => {
        if (!listenLater) {
            addLaterListen();
        } else {
            removeLaterListen();
        }
    }

    return (
        <Tooltip
            title= {listenLater ? "Unmark for later listening" : "Mark for later listening"}
            onClick={handleLaterListenButtonClick}
            sx={{
                color: listenLater ? '#1e81b0' : 'primary'
            }}
        >
            <IconButton
                aria-label="Listen later" 
            >
                {listenLater ? <AccessTimeFilledIcon /> : <AccessTimeIcon />}
            </IconButton>
        </Tooltip> 
    );
}
 
export default ListenLaterButton;