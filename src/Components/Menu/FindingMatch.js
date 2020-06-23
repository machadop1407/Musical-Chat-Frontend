import React, { useState, useEffect } from "react";
import "../../Styles/FindingMatch.css";
import axios from "axios";

export default function FindingMatch({ spotifyId, updateMatch, isMatched }) {
  const [name, setName] = useState("");

  const findMatch = () => {
    // axios
    //   .post(process.env.REACT_APP_API_URL + "matching", { id: spotifyId })
    //   .then((res) => {
    //     updateMatch(res.data[0]);
    //   });

    updateMatch({ username: "CacaBB" });
  };

  return (
    <>
      {!isMatched && (
        <div className="matchWrapper">
          <h1>Find A New Match!</h1>
          <input type="text" placeholder={name} />
          <button id="matchBttn" onClick={findMatch}>
            Search
          </button>
        </div>
      )}

      {isMatched && (
        <button id="matchBttn" onClick={findMatch}>
          Re-Match
        </button>
      )}
    </>
  );
}
