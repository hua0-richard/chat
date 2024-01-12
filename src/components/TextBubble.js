import React from "react";
import "./TextBubble.css";

function TextBubble({ data, user }) {
  console.log(data.user);
  console.log(user);
  return (
    <div class="container">
      {user === data.user ? (
        <div className="container-self">
          <div class="bubble">{data.data}</div>
        </div>
      ) : (
        <div className="container-other">
          <div class="profile-container">
            <div class="profile"></div>
          </div>
          <div class="bubbleAlt">{data.data}</div>
        </div>
      )}
    </div>
  );
}

export default TextBubble;
