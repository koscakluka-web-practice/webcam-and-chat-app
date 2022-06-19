import { ThemeProvider } from "@emotion/react";

import { Typography, Box } from "@mui/material";
import Header from "./components/Header/Header";
import VideoChatGrid from "./components/VideoChatGrid/VideoChatGrid";
import OptionsArea from "./components/OptionsArea/OptionsArea";
import NotificationsArea from "./components/NotificationsArea/NotificationsArea";

import theme from "./styles/themes/base";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Header position="static" color="inherit">
          <Typography variant="h2" align="center">
            Video Chat
          </Typography>
        </Header>
        <VideoChatGrid />
        <OptionsArea>
          <NotificationsArea />
        </OptionsArea>
      </Box>
    </ThemeProvider>
  );
};

export default App;
