// var express = require("express");
// var app = express();

var io = require("socket.io").listen(5000);

io.on("connection", socket => {
  console.log("new connection", socket.id);

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("doodle", data => {
    socket.broadcast.emit("doodle", data);
  });

  socket.on("msg", msg => {
    console.log("message: " + msg);
    io.emit("msg", msg);
  });
});

// PORT
// server -- 5000
// socket -- listening to same port as server(5000)
// client -- 3000

// this is used for production
// app.use(express.static("client/build"));
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/client/build/index.html");
// });
