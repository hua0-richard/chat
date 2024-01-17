import React from "react";
import Avatar from "boring-avatars";
import "./TextBubble.css";

function TextBubble({ data, user, group }) {
  let profilePicture,
    avatar,
    messageBubble,
    displayName,
    textBubble = <></>;

  avatar = (
    <Avatar
      size={24}
      name={data.user}
      variant="marble"
      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
    />
  );

  if (user === data.user) {
    if (!group) {
      displayName = <div>{data.pokemon} (Me)</div>;
      profilePicture = <div class="profile-container">{avatar}</div>;
    }
    textBubble = (
      <div className="container-self">
        <div className="bubble-user-container">
          {displayName}
          <div className="bubble">{data.data}</div>
        </div>
        {profilePicture}
      </div>
    );
  } else {
    if (!group) {
      displayName =  <div>{data.pokemon}</div>
      profilePicture = <div className="profile-container">{avatar}</div>
    }
    textBubble = (
      <div className="container-other">
      {profilePicture}
      <div className="bubble-user-container-alt">
        {displayName}
        <div class="bubbleAlt">{data.data}</div>
      </div>
    </div>
    )
  }

  return (
    <div class="container">
      {user === data.user ? (
        textBubble
      ) : (
        textBubble
      )}
    </div>
  );
}

export default TextBubble;
