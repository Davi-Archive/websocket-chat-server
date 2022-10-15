const path = require("path");
const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const socketio = require("socket.io");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Run when client connects
io.on("connection", (socket) => {
  console.log("New WS connection");

  socket.emit("message", "Bem vindo ao Chat");
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
