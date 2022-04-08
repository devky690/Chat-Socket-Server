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

  socket.on("counter", () => {
    count++;
    io.emit("counter", count);
  });
});
