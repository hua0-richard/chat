import "./App.css";
import TextBubble from "./components/TextBubble";
import { FaPaperPlane } from "react-icons/fa";
import { useEffect, useState, useRef, componentDidUpdate } from "react";
import socketIO from "socket.io-client";
// change to node env
const socket = socketIO.connect("http://localhost:3500");
function App() {
  const [messageList, updateMessageList] = useState([]);
  const [text, updateText] = useState("");
  const targetElementRef = useRef(null);

  // Function to scroll to the target element
  const scrollToTarget = () => {
    targetElementRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function handleUpdateText(event) {
    updateText(event.target.value);
  }

  function message() {
    if (text !== "") {
      socket.emit("message", text);
      console.log(messageList);
      updateText("");
    }
  }

  useEffect(() => {
    socket.on("message", (mes) => {
      updateMessageList([...messageList, mes]);
    })
    scrollToTarget(); 
  });

  return (
    <div>
      <div className="Header">
        <h1 style={{ width: "170px" }}>Chat Room</h1>
      </div>
        <div className="message-container">
          {messageList.map((m) => (
            <TextBubble data={m} user={socket.id}></TextBubble>     
          ))}
          <div id="ref" ref={targetElementRef}></div>
        </div>
      <div className="chat">
        <div className="chat-container">
          <input
            placeholder="Type Here..."
            className="chatbox"
            value={text}
            onChange={handleUpdateText}
          ></input>
          <div className="send-container">
            <FaPaperPlane
              onClick={() => {
                message();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
