import React from "react";
import SocketIOClient from "socket.io-client";
//const socket = SocketIOClient("http://localhost:5000");
const socket = SocketIOClient("https://chat-and-canvas.herokuapp.com/");

class Chat extends React.Component {
  state = { messages: [], newMessage: "" };
  componentDidMount() {
    socket.on("chat", msg => {
      const history = this.state.messages;
      history.push(msg);
      this.setState({ messages: history });
    });
  }
  typeMsg = e => {
    const msg = e.target.value;
    this.setState({ newMessage: msg });
  };
  submitMsg = () => {
    const msg = this.state.newMessage;
    socket.emit("chat", msg);
    this.setState({ newMessage: "" });
  };
  onKeyPress = e => {
    if (e.which === 13) {
      this.submitMsg();
    }
  };
  render() {
    return (
      <div>
        <h1>Chat</h1>
        <div className="chat-area">
          <input
            type="text"
            onChange={this.typeMsg}
            onKeyPress={this.onKeyPress}
            value={this.state.newMessage}
            className="chat-input"
            placeholder="type and press Enter"
          />
          <div className="chat-display">
            {this.state.messages &&
              this.state.messages.map(msg => <p>{msg}</p>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
