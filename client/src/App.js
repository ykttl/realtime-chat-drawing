import React from "react";
import Chat from "./Chat";
import Canvas from "./Canvas";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="canvas-box">
          <Canvas />
        </div>
        <div className="chat-box">
          <Chat />
        </div>
      </div>
    );
  }
}

export default App;
