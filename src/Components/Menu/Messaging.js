import React, { useEffect, useState, useRef } from "react";

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
  const [loaded, setLoaded] = useState(false);

  //Child Messages Ref
  const chatRef = useRef(null);

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
              socket.emit("joinroom", res.data[0].room);
              setLoaded(true);
            });
        }
      });
  }, []);

  const updateMatch = (user) => {
    if (isMatched) {
      axios.post(process.env.REACT_APP_API_URL + "matching/deletematch", {
        id: match.spotifyId,
      });
    }
    setMatch(user);
    setIsMatched(true);
    axios
      .get(process.env.REACT_APP_API_URL + `chat/getuser/${spotifyId}`)
      .then((res) => {
        setRoom(res.data[0].room);
        socket.emit("joinroom", res.data[0].room);
        axios
          .post(process.env.REACT_APP_API_URL + `chat/deletemessages`, {
            room: res.data[0].room,
          })
          .then(() => {
            chatRef.current.eraseMessages();
          });
      });

    setLoaded(true);
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

        {isMatched && (
          <div className="chat">
            {loaded && (
              <Chat user={username} socket={socket} room={room} ref={chatRef} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
