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
      </nav>
    </>
  );
}
