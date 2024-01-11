import "./App.css";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:3500");
function App() {
  const [messageList, updateMessageList] = useState([]);

  function message() {
    socket.emit("message", socket.id.substring(0, 5) + " said hi");
    console.log(messageList)
  }

  useEffect(() => {
    socket.on("message", (data) => {
      updateMessageList([...messageList," " + data]);
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
      {messageList.map((m) => (<div className="container">{m}</div>))}
    </div>
  );
}

export default App;
