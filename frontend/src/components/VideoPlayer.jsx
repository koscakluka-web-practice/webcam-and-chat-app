import { useContext } from "react";

import { MediaContext } from "../contexts/MediaContext";

import { Grid, Paper, Typography, styled } from "@mui/material";

const VideoContainer = styled(Grid)(({ theme }) => ({
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "93%",
  },
}));

const VideoWrapper = styled(Paper)(({ theme }) => ({
  padding: "10px",
  border: "2px solid black",
  margin: "10px",
}));

const Video = styled("video")(({ theme }) => ({
  width: "510px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const VideoPlayer = () => {
  const {
    name,
    callAccepted,
    myMedia,
    receivingMedia,
    callEnded,
    mediaStream,
    call,
  } = useContext(MediaContext);

  return (
    <VideoContainer container>
      {mediaStream && (
        <VideoWrapper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <Video playsInline ref={myMedia} muted autoPlay />
          </Grid>
        </VideoWrapper>
      )}
      {callAccepted && !callEnded && (
        <VideoWrapper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call?.caller?.name || "No Name"}
            </Typography>
            <Video playsInline ref={receivingMedia} autoPlay />
          </Grid>
        </VideoWrapper>
      )}
    </VideoContainer>
  );
};

export default VideoPlayer;
