import React, { createContext, useState, useRef, useEffect, Children } from 'react';
import {io} from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const MediaProvider = ( {children} ) => {
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
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(mediaStream => {
                setMediaStream(mediaStream);

                myMedia.current.srcObject = mediaStream;
            });

        socket.on("me", id => {
            setMe(id);
        })

        socket.on("call-user", ({signal, caller}) => {
            setCall({isReceivingCall: true, caller, signal});
        });
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, mediaStream});

        peer.on("signal", (data) => {
            socket.emit("answer-call", {callerId: call.caller.id, signal: data})
        });

        peer.on("stream", mediaStream => {
            receivingMedia.current.srcObject = mediaStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {

        const peer = new Peer({ initiator: true, trickle: false, mediaStream});

        peer.on("signal", (data) => {
            socket.emit("call-user", {caleeId: id, caller: {id: me, name}, signalData: data})
        });

        peer.on("stream", mediaStream => {
            receivingMedia.current.srcObject = mediaStream;
        });

        socket.on("call-accepted", signal => {
            setCallAccepted(true);

            peer.signal(signal);
        })

        connectionRef.current = peer;

    }

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destory();

        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{
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
            answerCall
        }}>
            {children}
        </SocketContext.Provider>
    );
}

export {MediaProvider, SocketContext};