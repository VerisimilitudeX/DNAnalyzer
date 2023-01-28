import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setNavbarOpen(false);
  };

  return (
    <header>
      <div className="wrap header--flex">
        <Link className="header--flex" to="/">
          <img
            className="header--logo"
            src="./whitelogo.svg"
            alt="DNAnalyzer logo"
          ></img>
          <h1>DNAnalyzer</h1>
        </Link>
        <nav className="header--flex navBar">
          <button onClick={handleToggle}>
            {navbarOpen ? (
              <MdClose
                style={{ color: "#fff", width: "40px", height: "40px" }}
              />
            ) : (
              <FiMenu
                style={{ color: "#7b7b7b", width: "40px", height: "40px" }}
              />
            )}
          </button>
          <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <li className="header--logo">
              <NavLink
                className="header--logo active-link"
                to="/intro"
                onClick={() => closeMenu()}
              >
                Introduction
              </NavLink>
            </li>
            <li className="header--logo">
              <NavLink
                className="header--logo active-link"
                to="/background"
                onClick={() => closeMenu()}
              >
                Background
              </NavLink>
            </li>
            <li className="header--logo">
              <NavLink
                className="header--logo active-link"
                to="/sponsor"
                onClick={() => closeMenu()}
              >
                Sponsor
              </NavLink>
            </li>
            <li className="header--logo">
              <NavLink
                className="header--logo active-link"
                to="/sponsor"
                onClick={() => closeMenu()}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
