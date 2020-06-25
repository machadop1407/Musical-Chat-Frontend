import React, { useEffect, useState } from "react";
import "../../Styles/Messaging.css";
import FindingMatch from "../Menu/FindingMatch";
import axios from "axios";

export default function Messaging({ username, spotifyId }) {
  const [match, setMatch] = useState({});
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "matching/returnmatch", {
        params: { id: spotifyId },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      });
  }, []);

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
              <FindingMatch
                isMatched={isMatched}
                spotifyId={spotifyId}
                username={username}
                updateMatch={updateMatch}
              />
            </div>
            <div id="match-username">
              @
              {match.username.length > 14
                ? match.username.substring(0, 11) + "..."
                : match.username}
            </div>
          </>
        )}
      </div>

      <div className="messagingContent">
        {!isMatched && (
          <FindingMatch
            spotifyId={spotifyId}
            username={username}
            updateMatch={updateMatch}
            isMatched={isMatched}
          />
        )}

        <div className="chat"></div>
      </div>
    </div>
  );
}
