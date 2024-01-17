import React from "react";
import Avatar from "boring-avatars";
import "./TextBubble.css";

function TextBubble({ data, user, group }) {
  let profilePicture,
    avatar,
    displayName,
    messageBubble,
    textBubble = <></>;

  avatar = (
    <Avatar
      size={24}
      name={data.user}
      variant="marble"
      colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
    />
  );

  if (!group) {
    displayName = <div>{data.pokemon}</div>;
    profilePicture = <div class="profile-container">{avatar}</div>;
  }

  if (user === data.user) {
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
    textBubble = (
      <div className="container-other">
      {profilePicture}
      <div className="bubble-user-container-alt">
        {displayName}
        {messageBubble}
      </div>
    </div>
    )
  }

  return (
    <div class="container">
      {textBubble}
    </div>
  );
}

export default TextBubble;
