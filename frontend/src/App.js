import {Typography, AppBar, createTheme, styled, Box} from "@mui/material"
import { ThemeProvider } from "@emotion/react";

const StyledAppBar = styled(AppBar)(({theme}) => ({
  borderRadius: 15,
  margin: '30px 100px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '600px',
  border: '2px solid black',
}))

const Wrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}))

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <StyledAppBar position="static" color="inherit">
          <Typography variant="h2" align="center">Video Chat</Typography>
        </StyledAppBar>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
