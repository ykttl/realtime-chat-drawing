import React from "react";
import Chat from "./Chat";
import Canvas from "./Canvas";

class App extends React.Component {
  state = {
    username: "",
    enter: false,
    error: false
  };
  typeUsername = e => {
    this.setState({ username: e.target.value });
  };
  enter = e => {
    if (this.state.username === "") {
      this.setState({ error: true });
      return;
    }
    this.setState({ enter: true });
  };
  onKeyPress = e => {
    if (e.which === 13) {
      this.enter();
    }
  };
  render() {
    return (
      <div>
        {!this.state.enter ? (
          <div className="username-box">
            <h2>What is your name?</h2>
            {this.state.error && <p>Please enter username :p</p>}
            <input
              type="text"
              onChange={this.typeUsername}
              onKeyPress={this.onKeyPress}
              className="username-input"
            />
            <button onClick={this.enter} className="username-btn">
              Enter!
            </button>
          </div>
        ) : (
          <div>
            <h2 className="username">Hello, {this.state.username}!</h2>
            <div className="container">
              <div className="canvas-box">
                <Canvas />
              </div>
              <div className="chat-box">
                <Chat username={this.state.username} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
