import { useState, useContext } from "react";
import { MediaContext } from "../../contexts/MediaContext";

import {
  OptionsContainer,
  OptionsPaper,
  OptionsForm,
  OptionsGrid,
  OptionsButton,
  PaddedGrid,
} from "./OptionsArea.style";
import { TextField, Typography } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Assignment, Phone, PhoneDisabled } from "@mui/icons-material";

const OptionsArea = ({ children }) => {
  const [calleeId, setCalleeId] = useState("");

  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } =
    useContext(MediaContext);

  return (
    <OptionsContainer>
      <OptionsPaper elevation={10}>
        <OptionsForm noValidate autoComplete="off">
          <OptionsGrid container>
            {/*** Account Info Column ***/}
            <PaddedGrid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">
                Account Info:
              </Typography>
              {/*** Name Field ***/}
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              {/*** Copy ID Button ***/}
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
            {/*** Call Column ***/}
            <PaddedGrid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">
                Make a call to:
              </Typography>
              {/*** Call ID Field ***/}
              <TextField
                label="ID to Call"
                value={calleeId}
                onChange={(e) => setCalleeId(e.target.value)}
                fullWidth
              />
              {/*** Call/End Call Button ***/}
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

export default OptionsArea;
