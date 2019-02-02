import React from "react";
import SocketIOClient from "socket.io-client";
//const socket = SocketIOClient("http://localhost:5000");
const socket = SocketIOClient("https://chat-and-canvas.herokuapp.com/");

class Chat extends React.Component {
  state = { messages: [], newMessage: "" };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    socket.on("chat", data => {
      const history = this.state.messages;
      const arr = [data.msg, data.username];
      history.push(arr);
      this.setState({ messages: history });
    });
  }
  typeMsg = e => {
    const msg = e.target.value;
    this.setState({ newMessage: msg });
  };
  submitMsg = () => {
    socket.emit("chat", {
      msg: this.state.newMessage,
      username: this.props.username
    });
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
              this.state.messages.map(msg => (
                <p>
                  {msg[1]}: {msg[0]}
                </p>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
