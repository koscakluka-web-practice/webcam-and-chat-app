import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const MediaContext = createContext();

const socket = io("http://localhost:5000", { secure: true });

const MediaProvider = ({ children }) => {
  const [me, setMe] = useState("");
  const [name, setName] = useState("");
  const [mediaStream, setMediaStream] = useState(null);
  const [call, setCall] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myMedia = useRef();
  const receivingMedia = useRef();

  const connectionRef = useRef();

  useEffect(() => {
    let retryMediaInterval = null;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        setMediaStream(mediaStream);

        if (myMedia.current) {
          myMedia.current.srcObject = mediaStream;
        } else {
          retryMediaInterval = setInterval(() => {
            if (myMedia.current) {
              myMedia.current.srcObject = mediaStream;
              clearInterval(retryMediaInterval);
              retryMediaInterval = null;
            }
          }, 1000);
        }
      });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("call-user", ({ signal, caller }) => {
      setCall({ isReceivingCall: true, caller, signal });
    });

    return () => {
      if (retryMediaInterval) {
        clearInterval(retryMediaInterval);
      }
    };
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    //console.log("Creating Peer");
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: mediaStream,
    });

    peer.on("signal", (data) => {
      //console.log("Answering call: ", data);
      socket.emit("answer-call", {
        callerId: call.caller.id,
        callee: { id: me, name },
        signal: data,
      });
    });

    peer.on("stream", (receivedStream) => {
      //console.log("Received Stream (callee): ", receivedStream);
      receivingMedia.current.srcObject = receivedStream;
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    //console.log("Creating Peer");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: mediaStream,
    });

    peer.on("signal", (data) => {
      //console.log("Calling user", data);
      socket.emit("call-user", {
        calleeId: id,
        caller: { id: me, name },
        signalData: data,
      });
    });

    peer.on("stream", (receivedStream) => {
      //console.log("Received Stream (caller): ", receivedStream);
      receivingMedia.current.srcObject = receivedStream;
    });

    socket.on("call-accepted", ({ signal, callee }) => {
      //console.log("Call Accepted", signal, callee);
      setCallAccepted(true);
      setCall({ isReceivingCall: false, caller: callee, signal });

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <MediaContext.Provider
      value={{
        call,
        callAccepted,
        myMedia,
        receivingMedia,
        mediaStream,
        callEnded,
        me,
        name,
        setName,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export { MediaProvider, MediaContext };
