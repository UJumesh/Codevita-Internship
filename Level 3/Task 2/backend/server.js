const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");


const app = express();

app.use(cors());
app.use(express.json());


const server = http.createServer(app);


const io = new Server(server, {
    cors:{
        origin:"http://localhost:3000"
    }
});

let onlineUsers = 0;

io.on("connection",(socket)=>{

    onlineUsers++;

    console.log("User connected:", socket.id);

    io.emit("onlineUsers", onlineUsers);

    socket.emit("connectionStatus", {
        status:"connected"
    });

    socket.on("sendSkill",(data)=>{

        io.emit("receiveNotification",{
            message:`${data.user} added a new skill: ${data.skill}`,
            time:new Date().toLocaleTimeString()
        });

    });

    socket.on("disconnect",()=>{

        onlineUsers--;

        console.log("User disconnected:",socket.id);

        io.emit("onlineUsers",onlineUsers);

    });

});


app.get("/",(req,res)=>{

    res.json({
        message:"WebSocket Server Running 🚀"
    });

});


const PORT = 5001;


server.listen(PORT,()=>{

    console.log(`Server running on port ${PORT}`);

});