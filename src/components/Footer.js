// src/components/Footer.js

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCartShopping,
  faClipboardList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="fixed-bottom  text-white">
      <nav className="bg-white justify-content-around navbar">
        <ul className="bg-transparent d-flex justify-content-between mx-5 px-0 w-100">
          <li className="nav-item">
            <a className="nav-link" href="/">
              <FontAwesomeIcon icon={faHome} />
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link" href="/cart">
              <FontAwesomeIcon icon={faCartShopping} />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/profile">
              <FontAwesomeIcon icon={faUser} />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
