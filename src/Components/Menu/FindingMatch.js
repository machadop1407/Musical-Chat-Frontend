import React, { useState, useEffect } from "react";
import "../../Styles/FindingMatch.css";
import axios from "axios";

export default function FindingMatch({ spotify, spotifyId }) {
  const [name, setName] = useState("");

  // useEffect(() => {}, []);

  const findMatch = () => {
    axios
      .post(process.env.REACT_APP_API_URL + "/matching", { id: spotifyId })
      .then((res) => {
        if (res.message != undefined) {
          console.log(res.data.message);
        } else {
          console.log(res);
        }
      });
  };

  return (
    <div className="matchWrapper">
      <h1>Find A New Match!</h1>
      <input type="text" placeholder={name} />
      <button id="matchBttn" onClick={findMatch}>
        Search
      </button>
    </div>
  );
}
