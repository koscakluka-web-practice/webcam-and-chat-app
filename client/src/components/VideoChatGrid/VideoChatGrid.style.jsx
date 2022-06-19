import { Grid, Paper, styled } from "@mui/material";

const VideoGrid = styled(Grid)(({ theme }) => ({
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    width: "93%",
  },
}));

const VideoCard = styled(Paper)(({ theme }) => ({
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

export { VideoGrid, VideoCard, Video };
