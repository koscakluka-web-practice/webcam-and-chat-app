import { useContext } from "react";

import { MediaContext } from "../../contexts/MediaContext";

import { VideoGrid, VideoCard, Video } from "./VideoChatGrid.style";
import { Grid, Typography } from "@mui/material";

const VideoChatGrid = () => {
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
    <VideoGrid container>
      {mediaStream && (
        <VideoCard>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <Video playsInline ref={myMedia} muted autoPlay />
          </Grid>
        </VideoCard>
      )}
      {callAccepted && !callEnded && (
        <VideoCard>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call?.caller?.name || "No Name"}
            </Typography>
            <Video playsInline ref={receivingMedia} autoPlay />
          </Grid>
        </VideoCard>
      )}
    </VideoGrid>
  );
};

export default VideoChatGrid;
