import React from "react";
import Chat from "./Chat";
import Doodle from "./Doodle";

class App extends React.Component {
  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-2-5">
          <Chat />
        </div>
        <div className="pure-u-3-5">
          <Doodle />
        </div>
      </div>
    );
  }
}

export default App;
