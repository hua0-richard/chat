import "./App.css";
import TextBubble from "./components/TextBubble";
import { FaPaperPlane } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import { socket } from "./Socket";
import Announcement from "./components/Announcement";
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
      updateText("");
    }
  }

  useEffect(() => {
    socket.on("message", (mes) => {
      let obj = {
        type: "message",
        data: mes,
      };
      updateMessageList([...messageList, obj]);
      updateMessageFlag(true);
    });
    socket.on("userCount", (count) => {
      console.log(count);
      updateUsersOnline(count);
    });
    socket.on("userConnected", (user) => {
      if (user !== socket.id) {
        let obj = {
          type: "annoucement",
          data: `${user} joined the chat`
        }
        console.log(obj)
        updateMessageList([...messageList, obj])
        updateMessageFlag(true);
      }
    }) 
    socket.on("userDisconnected", (user) => {
      let obj = {
        type: "annoucement",
        data: `${user} left the chat`
      }
      updateMessageList([...messageList, obj])
      updateMessageFlag(true);
    }) 
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
        {messageList.map((m) =>
          m.type === "message" ? (
            <TextBubble data={m.data} user={socket.id}></TextBubble>
          ) : (
            <Announcement text={m.data}></Announcement>
          ),
        )}
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
