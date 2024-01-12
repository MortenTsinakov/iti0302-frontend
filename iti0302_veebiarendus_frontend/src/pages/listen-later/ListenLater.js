import { Box, Typography, ImageList, ButtonBase, ImageListItem, ImageListItemBar } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../constants/Constants";

const ListenLater = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const headers = localStorage.getItem("jwt") ? {
                'Authorization': `Bearer ${localStorage.getItem("jwt")}`
            } : null;
            axios.get(`${API_BASE_URL}/later-listen/my-later-listens`, {
                headers: headers
            }).then(
                (response) => setData(response.data)
            )
        } catch (error) {
            console.log(error)
        }
    }, []);

    const handleAlbumclick = async (name, artist) => {
        navigate(`/album-info?album=${encodeURIComponent(name)}&artist=${encodeURIComponent(artist)}`);
    }

    return (
        <Box>
            <Typography
                style={{
                    fontFamily: 'Josefin, sans-serif',
                    fontSize: '22px',
                }}
                sx={{
                    position: 'absolute',
                    maxWidth: '500px',
                    transform: 'translate(calc(50vw - 50% + 125px), 50px)'
                }}
            >
                Albums to listen later
            </Typography>
            <ImageList
                cols={4}
                sx={{
                    display:'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'left',
                    overflow: 'hidden',
                    ml:'300px',
                    mr:'50px',
                    mt:'150px'
                }}
            >
                {data.map((item, index) => (
                <ButtonBase
                    key={index}
                    onClick={() => handleAlbumclick(item.name, item.artist)}
                >
                    <ImageListItem
                    key={index}
                    sx={{
                        width: '250px',
                        height: '250px',
                        margin:'5px'
                    }}
                    >
                        <img src={item.imageUrl} alt={item.name} />
                        <ImageListItemBar
                            title={item.name}
                            subtitle={item.artist}
                            />
                    </ImageListItem>
                </ButtonBase>
                ))}
            </ImageList>
        </Box>
    );
}
 
export default ListenLater;