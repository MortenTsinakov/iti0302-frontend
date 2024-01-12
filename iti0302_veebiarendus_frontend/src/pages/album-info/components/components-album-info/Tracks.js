import { Grid, List, Typography } from "@mui/material";

const Tracks = ({tracks}) => {

    const secondsToMinutes = (seconds) => {
        if (seconds === 0) {
            return "no info";
        }
        let minutes = Math.floor(seconds / 60)
        seconds = seconds - (minutes * 60);
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`
    }

    return (
        <List
            sx={{
                mt:"30px"
            }}
        >
        {tracks.map((track, index) => (
            <List
                key={index}
            >
                <Grid
                    container
                    alignItems="center"
                >
                    <Grid item 
                        xs={6}
                    >
                        <Typography
                            align="left"
                        >
                            {track.rank}. {track.name}
                        </Typography>

                    </Grid>
                    <Grid item 
                        xs={6}
                    >
                        <Typography
                            align="right"
                        >
                            {secondsToMinutes(track.duration)}
                        </Typography>
                    </Grid>
                </Grid>
            </List>
        ))}
        </List>
    );
}
 
export default Tracks;