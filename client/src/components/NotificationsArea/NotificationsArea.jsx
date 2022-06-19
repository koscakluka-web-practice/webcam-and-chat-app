import { useContext } from "react";
import { MediaContext } from "../../contexts/MediaContext";

import { Button } from "@mui/material";
import { Phone } from "@mui/icons-material";

const NotificationsArea = () => {
  const { answerCall, call, callAccepted } = useContext(MediaContext);
  return (
    <>
      {call && call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>{call.caller.name} is calling...</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={answerCall}
            startIcon={<Phone />}
          >
            Answer Call
          </Button>
        </div>
      )}
    </>
  );
};

export default NotificationsArea;
