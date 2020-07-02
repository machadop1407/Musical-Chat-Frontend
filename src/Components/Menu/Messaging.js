import React, { useEffect, useState } from "react";

import "../../Styles/Messaging.css";

import FindingMatch from "../Menu/FindingMatch";
import Chat from "../Menu/Chat";

import axios from "axios";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = process.env.REACT_APP_API_URL;

export default function Messaging({ username, spotifyId }) {
  const [match, setMatch] = useState({});
  const [isMatched, setIsMatched] = useState(false);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket = io(CONNECTION_PORT);

    axios
      .get(process.env.REACT_APP_API_URL + `matching/returnmatch/${spotifyId}`)
      .then((res) => {
        if (res.data.message != 0) {
          setMatch(res.data);
          setIsMatched(true);
          axios
            .get(process.env.REACT_APP_API_URL + `chat/getuser/${spotifyId}`)
            .then((res) => {
              setRoom(res.data[0].room);
              socket.emit("joinroom", res.data.room);
            });
        }
      });
  }, []);

  const updateMatch = (user) => {
    setMatch(user);
    setIsMatched(true);
    axios
      .get(process.env.REACT_APP_API_URL + `chat/getuser/${spotifyId}`)
      .then((res) => {
        setRoom(res.data[0].room);
        socket.emit("joinroom", res.data.room);
      });
  };

  return (
    <div className="messagingWrapper">
      <div className="header">
        {/* <div id="username">@{username}</div> */}
        {isMatched && (
          <>
            <div id="rematch">
              {/* <FindingMatch
                isMatched={isMatched}
                spotifyId={spotifyId}
                username={username}
                updateMatch={updateMatch}
              /> */}
            </div>
            <div id="match-username">
              @
              {/* {match.username.length > 14
                ? match.username.substring(0, 11) + "..."
                : match.username} */}
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

        {isMatched && (
          <div className="chatWrap">
            <Chat user={username} socket={socket} room={room} />
          </div>
        )}
      </div>
    </div>
  );
}
