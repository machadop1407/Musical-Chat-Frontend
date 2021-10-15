import React, { useState } from "react";

import "../Styles/Header.css";
import Logo from "../Images/unnamed.png";

export default function Header() {
  return (
    <>
      <nav className="navbar">
        <a className="navbar-logo" href="#">
          <img src={Logo} width="50" height="50" alt="" />
        </a>
        <a className="navbar-title" href="#">
          <span className="navbar-title-text">Musical Chat</span>
        </a>
        <a href={process.env.REACT_APP_AUTH_URL}>
          <div className='login-btn-container'>
            <div className="header-login-btn">
              <span className="login-text"><p>Login With Spotify</p></span>
            </div>
          </div>

        </a>
      </nav>
    </>
  );
}
