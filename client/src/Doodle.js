import React from "react";
import SocketIOClient from "socket.io-client";
const socket = SocketIOClient("http://localhost:5000");

class Doodle extends React.Component {
  state = {
    isDrawing: false,
    currentX: 0,
    currentY: 0,
    lines: []
  };
  componentDidMount() {
    let canvas = document.getElementById("canvas");

    canvas.width = 800;
    canvas.height = 600;
    socket.on("doodle", data => {
      this.draw(data.x0, data.y0, data.x1, data.y1, data.isDrawing);
    });
  }
  draw = (x0, y0, x1, y1, isDrawing) => {
    let canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    if (this.state.isDrawing || isDrawing === true) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();

      socket.emit("doodle", {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        isDrawing: true
      });
    }
  };
  onMouseMove = e => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    this.setState(() => {
      return {
        currentX: x,
        currentY: y
      };
    }, this.draw(this.state.currentX, this.state.currentY, x, y));
  };
  onMouseDown = e => {
    this.setState({
      isDrawing: true
      //   currentX: e.nativeEvent.offsetX,
      //   currentY: e.nativeEvent.offsetY
    });
  };
  onMouseUp = e => {
    this.setState({
      isDrawing: false
      //   currentX: e.nativeEvent.offsetX,
      //   currentY: e.nativeEvent.offsetY
    });
  };
  render() {
    return (
      <div style={{ background: "pink" }}>
        <h1>Doodle</h1>
        <canvas
          id="canvas"
          style={{ border: "dashed" }}
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        />
      </div>
    );
  }
}

export default Doodle;
