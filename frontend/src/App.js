import { ThemeProvider } from "@emotion/react";

import {Typography, createTheme, Box} from "@mui/material"
import Header from "./components/Header";

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}>
        <Header position="static" color="inherit">
          <Typography variant="h2" align="center">Video Chat</Typography>
        </Header>
      </Box>
    </ThemeProvider>
  );
}

export default App;
