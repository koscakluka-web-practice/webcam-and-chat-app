import express from "express";
import cors from "cors";

import {createServer} from "http";
import {Server} from "socket.io";

const PORT = process.env.PORT || 5000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})

app.use(cors());

app.get("/", (req, res) => {
    res.send("Server running.");
});

io.on('connection', (socket) => {
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        socket.broadcast.emit("call-ended");
    });

    socket.on("call-user", ({calleeId, caller, signalData}) => {
        io.to(caleeId).emit("call-user", {signal: signalData, caller});
    });

    socket.on("answer-call", ({callerId, signal}) => {
        io.to(callerId).emit("call-accepted", signal);
    });
})

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));