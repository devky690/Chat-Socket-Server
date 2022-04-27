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

  socket.on("counter", () => {
    count++;
    io.emit("counter", count);
  });

  //for login and registration
  socket.on("send-name", name => {
    socket.userName = name || "Anonymous";
    console.log(socket.userName);
  });

  socket.on("send-msg", message, username => {
    console.log(message);
    console.log(username);
    socket.emit("receive-msg", message, username);
  });
});

//hello
