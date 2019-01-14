const express = require("express");
const app = express();

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

const PORT = process.env.PORT || 5000;
const io = require("socket.io").listen(PORT);

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
