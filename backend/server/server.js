const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDb = require("./config/db_connection");
const socketIO = require('socket.io');
require('dotenv').config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to the database
connectDb();

// Create HTTP server
const server = http.createServer(app);
// define socket

const io=socketIO(server,{
  cors:{
    origin:"http://localhost:5173",
    methods:["GET","POST"],
  }
})

io.on("connection",(socket)=>{
  console.log("user connected")
  socket.on("sendMessage",(data)=>{
    socket.broadcast.emit("receive_message",data)
  })
})


// Define HTTP routes
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/rooms", require("./routes/chatroomRoute"));
app.use("/api/messages", require("./routes/messageRoute"));
app.use("/api/notifications", require("./routes/notificationRoute"));

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

