const express = require("express");
const socket = require("socket.io");
const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

const io = socket(server);

io.on("connection", socket => {
  console.log("New socket connection: " + socket.id);
  socket.userName = "Anonymous";

  //for login
  socket.on("login", name => {
    console.log(name);
    socket.userName = name || "Anonymous";
  });

  socket.on("send-msg", message => {
    io.emit("receive-msg", message, socket.userName, socket.id);
  });

  socket.on("send-stats", (gamerTag, kd, winRate, wins) => {
    const loginName = socket.userName;
    io.emit("receive-stats", loginName, gamerTag, kd, winRate, wins);
  });
  socket.on("logout", () => {
    socket.userName = "Anonymous";
  });
});

//hello
