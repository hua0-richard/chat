import "./App.css";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:3500");
function App() {
  const [messageList, updateMessageList] = useState([]);

  const [inputValue, updateInputValue] = useState("");

  function handleInputValueChange(event) {
    updateInputValue(event.target.value);
  }

  function message() {
    socket.emit("message", inputValue);
    console.log(messageList);
  }

  useEffect(() => {
    socket.on("message", (data) => {
      updateMessageList([...messageList, " " + data]);
    });
  });

  return (
    <div>
      <div className="container">
        <div>
          {messageList.map((m) => (
            <div className="container">{m}</div>
          ))}
        </div>
      </div>

      <div className="chat">
        <input className="chatbox" value={inputValue} onChange={handleInputValueChange}></input>
        <button
          onClick={() => {
            message();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
