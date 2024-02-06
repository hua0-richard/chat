import React from "react";
import Avatar from "boring-avatars";
import "./TextBubble.css";
import { TiArrowForward } from "react-icons/ti";
import { IoArrowUndoSharp } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

function TextBubble({ data, user, group }) {
  let profilePicture,
    avatar,
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

  if (!group) {
    displayName = <div>{data.pokemon}</div>;
    profilePicture = <div class="profile-container">{avatar}</div>;
  }

  if (user === data.user) {
    let cssClass;
    if (!group) {
      cssClass = "container-self";
    } else {
      cssClass = "container-self-close";
    }
    textBubble = (
      <div className={cssClass}>
        <div className="bubble-user-container">
          {displayName}
          <div className="tapback-user">
            <div id="arrow-right">
              <HiOutlineDotsHorizontal />
              <TiArrowForward />
            </div>
            <div className="bubble" class="bg-primary">{data.data}</div>
          </div>
        </div>
        {profilePicture}
      </div>
    );
  } else {
    let cssClass;
    if (!group) {
      cssClass = "container-other";
    } else {
      cssClass = "container-other-close";
    }
    textBubble = (
      <div className={cssClass}>
        {profilePicture}
        <div className="bubble-user-container-alt">
          {displayName}
          <div className="tapback-other">
            <div id="arrow-left">
              <IoArrowUndoSharp />
              <HiOutlineDotsHorizontal />
            </div>
            <div class="bg-gradient-to-r from-rose-400 to-red-500" >{data.data}</div>
          </div>
        </div>
      </div>
    );
  }

  return <div class="container">{textBubble}</div>;
}

export default TextBubble;
