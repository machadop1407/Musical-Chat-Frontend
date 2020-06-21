import React, { useState } from "react";

import "../Styles/Header.css";
import Logo from "../Images/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="#">
          <img
            src={Logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt=""
          />
        </a>
      </nav>
    </>
  );
}
