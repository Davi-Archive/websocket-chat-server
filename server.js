const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

// App accept requests, but http stream data in websockets ( no need to reload )
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const Server = require("socket.io");
app.use(cors());

const socketIO = Server(http, {
  cors: {
    origin: "*",
  },
});

// connect with socket.io to get data
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });

  // message to all users on the server
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  //while typing send message
  socket.on("typing", (data) => {
    socket.emit("typingResponse", data)
  });

  socket.on("newUser", (data) => {
    let users = [];
    users.push(data);
    socketIO.emit("newUserResponse", users);
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Chat server, ONLINE using websockets" });
});

const PORT = process.env.PORT || 3001;

http.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
