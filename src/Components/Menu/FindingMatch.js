import React, { useState, useEffect } from "react";
import "../../Styles/FindingMatch.css";
import axios from "axios";

export default function FindingMatch({ spotifyId, updateMatch, isMatched }) {
  // const [name, setName] = useState("");
  const [modal, setModal] = useState(false);
  const findMatch = () => {
    if (isMatched) {
      showModal();
    } else {
      // axios
      //   .post(process.env.REACT_APP_API_URL + "matching", { id: spotifyId })
      //   .then((res) => {
      //     updateMatch(res.data);
      //   });
      updateMatch({ username: "CacaBB" });
    }
  };

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const continueRematch = () => {
    hideModal();
    // axios
    //   .post(process.env.REACT_APP_API_URL + "matching", { id: spotifyId })
    //   .then((res) => {
    //     updateMatch(res.data);
    //   });
    updateMatch({ username: "CacaBB" });
  };

  return (
    <>
      {!isMatched && (
        <div className="matchWrapper">
          <h1>Find A New Match!</h1>
          {/* <input type="text" placeholder={name} /> */}
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

      {modal && (
        <div className="re-match-modal">
          <div className="re-match-modal-content">
            <div className="modal-header">
              <button onClick={hideModal}>X</button>
            </div>
            <div className="modal-body">
              <h1 id="modal-text">
                Are you sure you want to find a new match? You will loose
                connection with the current user.
              </h1>
              <div className="modal-footer">
                <div className="modal-bttns">
                  <button onClick={continueRematch}>Continue</button>
                  <button onClick={hideModal}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
