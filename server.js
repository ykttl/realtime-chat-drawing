const express = require("express");
const app = express();
var io = require("socket.io").listen(5000);

app.use(express.static("client/build"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

io.on("connection", socket => {
  console.log("new connection", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("clearCanvas", () => {
    io.emit("clearCanvas");
  });

  socket.on("canvas", data => {
    socket.broadcast.emit("canvas", data);
  });

  socket.on("chat", msg => {
    io.emit("chat", msg);
  });
});
