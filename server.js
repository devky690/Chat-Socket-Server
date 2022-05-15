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
    socket.userName = name || "Anonymous";
    console.log(socket.userName);
  });

  socket.on("send-msg", (message, username) => {
    console.log(message);
    console.log(username);
    io.emit("receive-msg", message, username, socket.id);
  });

  socket.on("send-stats", (gamerTag, kd, winRate, wins) => {
    console.log(gamerTag);
    console.log(kd);
    console.log(wins);
    console.log(winRate);
    const loginName = socket.userName;
    console.log(loginName);
    io.emit("receive-stats", loginName, gamerTag, kd, winRate, wins);
  });
  socket.on("logout", () => {
    socket.userName = "Anonymous";
  });
});

//hello
