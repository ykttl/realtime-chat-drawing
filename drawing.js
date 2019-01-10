//following to: http://code-and.coffee/post/2015/collaborative-drawing-canvas-node-websocket/
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo.listen(server);
server.listen(8080);

app.use(express.static(__dirname + "/client"));
console.log("server is runining on 8080");

let line_history = [];

// event-handler for new incoming connections
io.on("connection", socket => {
  // first send the history to the new client
  for (var i in line_history) {
    socket.emit("draw_line", { line: line_history[i] });
  }
  // add handler for message type "draw_line".
  socket.on("draw_line", data => {
    // add received line to history
    line_history.push(data.line);
    // send line to all clients
    io.emit("draw_line", { line: data.line });
  });
});
