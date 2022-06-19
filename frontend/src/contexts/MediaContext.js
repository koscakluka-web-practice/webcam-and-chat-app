import React, { createContext, useState, useRef, useEffect } from 'react';
import {io} from "socket.io-client";
import Peer from "simple-peer";

const MediaContext = createContext();

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
        let retryMediaInterval = null;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(mediaStream => {
                setMediaStream(mediaStream);

                if(myMedia.current) {
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

        socket.on("me", id => {
            setMe(id);
        })

        socket.on("call-user", ({signal, caller}) => {
            setCall({isReceivingCall: true, caller, signal});
        });

        return () => {
            if(retryMediaInterval) {
                clearInterval(retryMediaInterval);
            }
        }
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
        <MediaContext.Provider value={{
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
        </MediaContext.Provider>
    );
}

export {MediaProvider, MediaContext};