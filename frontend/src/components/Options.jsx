import { useState, useContext } from "react";
import { MediaContext } from "../contexts/MediaContext";

import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
  styled,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";

const OptionsContainer = styled(Container)(({ theme }) => ({
  width: "580px",
  margin: "35px 0",
  padding: 0,
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

const OptionsPaper = styled(Paper)(({ theme }) => ({
  padding: "10px 20px",
  border: "2px solid black",
}));

const OptionsForm = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));

const OptionsGrid = styled(Grid)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
  },
}));

const OptionsButton = styled(Button)(({ theme }) => ({
  marginTop: 20,
}));

const PaddedGrid = styled(Grid)(({ theme }) => ({
  padding: 10,
}));

const Options = ({ children }) => {
  const [calleeId, setCalleeId] = useState("");

  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(MediaContext);

  return (
    <OptionsContainer>
      <OptionsPaper elevation={10}>
        <OptionsForm noValidate autoComplete="off">
          <OptionsGrid container>
            <PaddedGrid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">
                Account Info:
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me}>
                <OptionsButton
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy Your ID
                </OptionsButton>
              </CopyToClipboard>
            </PaddedGrid>
            <PaddedGrid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">
                Make a call to:
              </Typography>
              <TextField
                label="ID to Call"
                value={calleeId}
                onChange={(e) => setCalleeId(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <OptionsButton
                  variant="outlined"
                  color="secondary"
                  startIcon={<PhoneDisabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                >
                  End call
                </OptionsButton>
              ) : (
                <OptionsButton
                  variant="contained"
                  color="primary"
                  startIcon={<Phone fontSize="large" />}
                  fullWidth
                  onClick={() => {
                    callUser(calleeId);
                  }}
                >
                  Call
                </OptionsButton>
              )}
            </PaddedGrid>
          </OptionsGrid>
        </OptionsForm>
        {children}
      </OptionsPaper>
    </OptionsContainer>
  );
};

export default Options;
