import "./App.css";
import TextBubble from "./components/TextBubble";
import { useEffect, useState } from "react";
import socketIO from "socket.io-client";
const socket = socketIO.connect("http://localhost:3500");
function App() {
  const [messageList, updateMessageList] = useState([]);

  const [text, updateText] = useState('');

  function handleUpdateText(event) {
    updateText(event.target.value);
  }

  function message() {
    if (text !== '') {
      socket.emit("message", text);
      console.log(messageList);
      updateText('')
    }
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
            <TextBubble text={m}></TextBubble>
          ))}
        </div>
      </div>

      <div className="chat">
        <input className="chatbox" value={text} onChange={handleUpdateText}></input>
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
