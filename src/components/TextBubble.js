import React from "react";
import Avatar from "boring-avatars";
import "./TextBubble.css";

function TextBubble({ data, user }) {
  console.log(data.user);
  console.log(user);
  return (
    <div class="container">
      {user === data.user ? (
          <div className="container-self">
            <div class="bubble-user-container">
              <div>{data.user}</div>
              <div class="bubble">{data.data}</div>
            </div>
            <div class="profile-container">
              <Avatar
                size={24}
                name={data.user}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
        </div>
      ) : (
          <div className="container-other">
            <div class="profile-container">
              <Avatar
                size={24}
                name={data.user}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="bubble-user-container-alt">
              <div>{data.user}</div>
              <div class="bubbleAlt">{data.data}</div>
            </div>
          </div>
      )}
    </div>
  );
}

export default TextBubble;
