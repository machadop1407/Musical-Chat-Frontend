import React, { useEffect, useState } from "react";
import "../../Styles/Messaging.css";
import FindingMatch from "../Menu/FindingMatch";

export default function Messaging({ username, spotifyId }) {
  const [match, setMatch] = useState({});
  const [isMatched, setIsMatched] = useState(false);

  const updateMatch = (user) => {
    setMatch(user);
    setIsMatched(true);
  };

  return (
    <div className="messagingWrapper">
      <div className="header">
        <div id="username">@{username}</div>
        {isMatched && (
          <>
            <div id="rematch">
              <FindingMatch isMatched={isMatched} />{" "}
            </div>
            <div id="match-username">Match: @{match.username}</div>
          </>
        )}
      </div>

      <div className="messagingContent">
        {!isMatched && (
          <FindingMatch
            spotifyId={spotifyId}
            updateMatch={updateMatch}
            isMatched={isMatched}
          />
        )}

        {/*  */}

        <div className="chat"></div>
      </div>
    </div>
  );
}
