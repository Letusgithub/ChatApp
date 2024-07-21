const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

app.use(cors());

app.get("/", (req, res)=>{
    res.send("Chat App Backend");
});

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND,
        methods: ["GET", "POST"],
    },
});
// Now ready for bidirectioncal communication


io.on("connection", (socket) => {
    // Code executed when a user connects to the Socket.IO server
    console.log(`User Connected: ${socket.id}`);
    socket.on("join_room", (data) => {
        // Code executed when a user joins a room
        socket.join(data);
        console.log(`User with ID:${socket.id} joined room: ${data}`)
    });

    socket.on("send_message", (data) => {
        // Code executed when a user sends a message
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});



server.listen(process.env.PORT, () => {
    console.log(`server Running on ${process.env.PORT}`);
})

module.exports = server;