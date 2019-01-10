import React from "react";
import SocketIOClient from "socket.io-client";
const socket = SocketIOClient("http://localhost:5000");

class Chat extends React.Component {
  state = { messages: [], newMessage: "" };
  componentDidMount() {
    socket.on("msg", msg => {
      let history = this.state.messages;
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
    socket.emit("msg", msg);
    this.setState({ newMessage: "" });
  };
  componentDidUpdate() {
    console.log(this.state);
  }
  render() {
    return (
      <div style={{ background: "yellow" }}>
        <h1>CHAT</h1>
        <div style={{ position: "fixed", bottom: 0, width: "40%" }}>
          <input
            type="text"
            onChange={this.typeMsg}
            value={this.state.newMessage}
            style={{ width: "80%", border: "solid 6px" }}
          />
          <button onClick={this.submitMsg}>submit</button>
        </div>

        <div>
          {this.state.messages && this.state.messages.map(msg => <p>{msg}</p>)}
        </div>
      </div>
    );
  }
}

export default Chat;
