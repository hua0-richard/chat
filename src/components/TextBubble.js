import React from "react";
import "./TextBubble.css";

function TextBubble({text}) {
    return(
    <div class="container">
        <div class="profile-container">
            <div class="profile"></div>
        </div>
        <div class="bubble">{text}</div>
    </div>
    );
}

export default TextBubble; 