import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/Menu.css";
import AudioWave from "./AudioWave";
import Fire from "../../Images/fire.gif";
import FindingMatch from "./FindingMatch";
import Messaging from "./Messaging";

export default function Menu({ spotify }) {
  const [topTracks, setTopTracks] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [username, setUsername] = useState(null);
  const [spotifyId, setId] = useState("");

  // var fakeTracks = [
  //   "sdada",
  //   "asdasd",
  //   "sdada",
  //   "asdasd",
  //   "asdasd",
  //   "sdada",
  //   "asdasd",
  //   "asdasd",
  //   "sdada",
  //   "asdasd",
  //   "asdasd",
  //   "sdada",
  //   "asdasd",
  //   "asdasd",
  //   "sdada",
  //   "asdasd",
  //   "asdasd",
  //   "sdada",
  //   "asdasd",
  //   "asdasd",
  // ];

  useEffect(() => {
    setUsername("Username");
    spotify.getMyTopTracks().then((res) => {
      setTopTracks(res.items);

      spotify.getMe().then((response) => {
        // Setting Genres
        var favoriteGenres = [];

        Array.prototype.byCount = function () {
          var itm,
            a = [],
            L = this.length,
            o = {};
          for (var i = 0; i < L; i++) {
            itm = this[i];
            if (!itm) continue;
            if (o[itm] == undefined) o[itm] = 1;
            else ++o[itm];
          }
          for (var p in o) a[a.length] = p;
          return a.sort(function (a, b) {
            return o[b] - o[a];
          });
        };

        res.items.map((track) => {
          spotify.getArtist(track.artists[0].id).then((artist) => {
            favoriteGenres.push(artist.genres[0]);
          });
        });

        var timeout = setInterval(function () {
          if (favoriteGenres.length != 0) {
            let postQuery = {
              username: response.display_name,
              spotifyId: response.id,
              genres: favoriteGenres.byCount()[0],
            };

            setUsername(response.display_name);
            setId(response.id);
            axios.post(process.env.REACT_APP_API_URL + "login", postQuery);
            clearInterval(timeout);
          }
        }, 100);
      });
    });

    spotify
      .getMyCurrentPlaybackState()
      .then((res) => {
        setCurrentSong(res.item.name);
      })
      .catch(() => {
        setCurrentSong("Music Not Playing");
      });
  }, []);

  return (
    <>
      <div className="row menuPage">
        <div className="leftCol">
          <div className="messaging">
            {spotifyId && spotifyId != undefined && (
              <Messaging username={username} spotifyId={spotifyId} />
            )}
          </div>
        </div>
        <div className="rightCol">
          <div className="topTracks">
            <div className="topTracksTitle">
              <h1> Your Top 20 </h1>
              <img src={Fire} id="fireEmoji" />
            </div>

            {topTracks.length > 0 && (
              <table>
                <tbody>
                  {topTracks.map((tracks, key) => (
                    <tr key={key + 1}>
                      <td id="id">{key + 1}</td>
                      <a href={tracks.external_urls.spotify} target="_blank">
                        <td id="tracks">
                          {tracks.name.length > 15
                            ? tracks.name.substr(0, 15).toLowerCase() + "..."
                            : tracks.name}
                        </td>
                      </a>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* <table>
              <tbody>
                {fakeTracks.map((tracks, key) => (
                  <tr key={key + 1}>
                    <td id="id">{key + 1}</td>
                    <a target="_blank">
                      <td id="tracks">{tracks}</td>
                    </a>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>

      <div className="row bottomMenu">
        <div className="bottomMenuContent">
          <AudioWave isListening={currentSong != "Music Not Playing"} />
          {currentSong != "Music Not Playing" && (
            <h1>Now Playing: {currentSong}</h1>
          )}
          {currentSong == "Music Not Playing" && <h1>{currentSong}</h1>}
        </div>

        {/* <h1 id="construction">
          THANK YOU FOR YOUR DATA, THE WEBSITE IS UNDER CONSTRUCTION
        </h1> */}
      </div>
    </>
  );
}
