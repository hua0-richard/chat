import "./App.css";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:3500");
function App() {
  const [messages, updateMessages] = useState([]);
  const [messageList, updateMessageList] = useState([]);

  function message() {
    socket.emit("message", socket.id.substring(0, 5) + " said hi");
  }

  useEffect(() => {
    socket.on("message", (data) => {
      updateMessages(messages + " " + data);
      updateMessageList([...messageList, messages + " " + data]);
    });
  });
  return (
    <div>
      <input></input>
      <button
        onClick={() => {
          message();
        }}
      >
        Send
      </button>
      <div className="container">
        {messageList.map((m) => <div className="container">{m}</div>)}
      </div>
    </div>
  );
}

export default App;
