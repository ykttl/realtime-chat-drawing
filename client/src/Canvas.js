import React from "react";
import SocketIOClient from "socket.io-client";
//const socket = SocketIOClient("http://localhost:5000");
const socket = SocketIOClient("https://chat-and-canvas.herokuapp.com/");

class Canvas extends React.Component {
  state = {
    isDrawing: false,
    currentX: 0,
    currentY: 0,
    customColor: false,
    color: "#000000",
    clear: false
  };
  componentDidMount() {
    const canvas = document.getElementById("canvas");
    canvas.width = 500;
    canvas.height = 500;

    socket.on("canvas", data => {
      if (this.state.clear === false) {
        this.draw(
          data.x0,
          data.y0,
          data.x1,
          data.y1,
          data.isDrawing,
          data.color
        );
      }
    });
    socket.on("clearCanvas", () => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 400, 500);
    });
  }
  draw = (x0, y0, x1, y1, isDrawing, color) => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 3;

    if (this.state.isDrawing || isDrawing === true) {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.stroke();

      socket.emit("canvas", {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        isDrawing: true,
        color: color
      });
    }
  };
  onMouseMove = e => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    this.setState(() => {
      return {
        clear: false,
        currentX: x,
        currentY: y
      };
    }, this.draw(this.state.currentX, this.state.currentY, x, y, null, this.state.color));
  };
  onMouseDown = e => {
    this.setState({
      isDrawing: true
    });
  };
  onMouseUp = e => {
    this.setState({
      isDrawing: false
    });
  };
  pickColor = e => {
    this.setState({ color: e.target.value, customColor: true });
  };
  clearCanvas = () => {
    this.setState({ clear: true });
    socket.emit("clearCanvas");
  };
  render() {
    return (
      <div>
        <h1>Canvas</h1>
        <div className="canvas-area">
          <input
            type="color"
            value={this.state.color}
            onChange={this.pickColor}
            className="color-picker"
          />
          <button className="clear-btn" onClick={this.clearCanvas}>
            Clear Canvas
          </button>
          <canvas
            id="canvas"
            onMouseMove={this.onMouseMove}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
          />
        </div>
      </div>
    );
  }
}

export default Canvas;
