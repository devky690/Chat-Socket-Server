const express = require("express");
const socket = require("socket.io");
const app = express();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT);

console.log("Server is running");

const io = socket(server);

let count = 0;

io.on("connection", socket => {
  console.log("New socket connection: " + socket.id);
  socket.userName = "Anonymous";

  //for login and registration
  socket.on("login", name => {
    socket.userName = name || "Anonymous";
    console.log(socket.userName);
  });

  socket.on("send-msg", (message, username) => {
    console.log(message);
    console.log(username);
    io.emit("receive-msg", message, username, socket.id);
  });

  socket.on("send-stats", (gamerTag, kd, wins, winRate) => {
    console.log(gamerTag);
    console.log(kd);
    console.log(wins);
    console.log(winRate);
    console.log(loginName);
    const loginName = socket.userName;
    io.emit("receive-stats", loginName, gamerTag, kd, wins, winRate);
  });
});

//hello
