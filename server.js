const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

// App accept requests, but http stream data in websockets ( no need to reload )
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000/",
    methods: ["GET", "POST"],
  },
});

// connect with socket.io to get data
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Chat server, ONLINE" });
});

const PORT = process.env.PORT || 3001;

http.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
