import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SearchResultCard from './components/SearchResultCard';
import {v4 as uuidv4} from 'uuid';

function SearchResultPage() {
    const location = useLocation();
    const searchResults = location.state?.result || [];
    const navigate = useNavigate();

    const handleClick = (name, artist) => {
        navigate(`/album-info?album=${encodeURIComponent(name)}&artist=${encodeURIComponent(artist)}`);
    }

    return (
        <Box
            sx={{
                transform: "translate(50vw)"
            }}
        >
            <Box
                sx={{
                    justifyContent:"center",
                    mt:"100px",
                }}
            >
                <Typography
                    style={{
                        fontFamily: 'Josefin, sans-serif',
                        fontSize: '22px',
                        left: "50%",
                        transform: "translate(-25%)"
                    }}
                >
                    Search results:
                </Typography>
            </Box>
            { searchResults.map((result) => (
                <div
                    key={uuidv4()}
                    style={{
                        marginTop:"25px",
                    }}
                >
                    <SearchResultCard 
                        onClick={() => handleClick(result.name, result.artist)}
                        album={result.name}
                        artist={result.artist}
                        imageUrl={result.imageUrl}
                    />
                </div>
            ))}
        </Box>
    );
}

export default SearchResultPage;