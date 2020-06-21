import React, { useEffect, useState } from "react";
import "../../Styles/Messaging.css";

export default function Messaging({ username }) {
  const [conversations, setConversations] = useState([1]);

  return (
    <div className="messagingWrapper">
      <div className="header">
        <div id="username">@{username}</div>
      </div>

      <div className="messagingContent">
        <div className="sidebar">
          <div className="sidebarMessage">
            <p>New Chat!</p>
          </div>
          {conversations.length > 0 &&
            conversations.map((val, key) => (
              <div className="sidebarMessage" id={val}>
                <p></p>
              </div>
            ))}
        </div>

        <div className="chat"></div>
      </div>
    </div>
  );
}
