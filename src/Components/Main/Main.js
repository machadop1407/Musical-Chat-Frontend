import React, { Component, useState, useEffect } from "react";
import "../../Styles/Main.css";

import Spotify from "spotify-web-api-js";
import Menu from "../Menu/Menu";

const spotifyWebApi = new Spotify();

const Main = () => {
  const getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  const params = getHashParams();

  const [loggedIn, setLoggedIn] = useState(params.access_token ? true : false);

  if (params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  return (
    <div className="Main">
      <div className="mainContainer">
        {!loggedIn && (
          <div className="row login">
            <div id="loginTitle">
              <p>
                Login With Your <span>Spotify</span> Account
              </p>
              <p>And Enjoy Meeting People Who </p>
              <p>Have The Same Musical Taste As</p>
              <p>YOU.</p>
            </div>

            <a href={process.env.REACT_APP_AUTH_URL}>
              <button>Login With Spotify</button>
            </a>
          </div>
        )}

        {loggedIn && <Menu spotify={spotifyWebApi} />}
      </div>
    </div>
  );
};

export default Main;
