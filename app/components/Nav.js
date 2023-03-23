import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { moonIcon, sunIcon } from "./icons";

export default function Nav({ theme, toggleTheme }) {
  return (
    <nav className="split">
      <NavLink
        to="/"
        className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
      >
        GitHub Battle
      </NavLink>

      <ul style={{ display: "flex", gap: "20px" }}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Popular
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/battle"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            Battle
          </NavLink>
        </li>

        <li>
          <button className="btn secondary icon" onClick={toggleTheme}>
            {theme === "light" ? moonIcon : sunIcon}
          </button>
        </li>
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
