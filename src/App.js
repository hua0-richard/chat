import "./App.css";
import TextBubble from "./components/TextBubble";
import { FaPaperPlane } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { socket } from "./Socket";
// change to node env
function App() {
  const [messageList, updateMessageList] = useState([]);
  const [messageFlag, updateMessageFlag] = useState(true);
  const [text, updateText] = useState("");
  const [usersOnline, updateUsersOnline] = useState(0);
  const targetElementRef = useRef(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      message();
    }
  };

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
      updateMessageFlag(true);
    });
    socket.on("userCount", (count) => {
      console.log(count);
      updateUsersOnline(count);
    });
    if (messageFlag) {
      scrollToTarget();
      updateMessageFlag(false);
    }
  });

  return (
    <div>
      <div className="header">
        <div className="header-inside-container">
          <div>Chat Room</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {" "}
            <div
              style={{
                borderRadius: "50%",
                width: "10px",
                height: "10px",
                backgroundColor: "green",
                margin: "4px",
              }}
            ></div>
            <p>{usersOnline} online</p>
          </div>
        </div>
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
            onKeyDown={handleKeyDown}
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
