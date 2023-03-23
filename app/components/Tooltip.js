import React, { Component } from "react";
import PropTypes from "prop-types";
import withHover from "./withHover";
import Hover from "./Hover";

const container = {
  position: "relative",
  display: "flex",
};

export default function Tooltip({ children, element }) {
  return (
    <Hover>
      {(hovering) => (
        <div style={container}>
          {hovering && element}
          {children}
        </div>
      )}
    </Hover>
  );
}

Tooltip.propTypes = {
  element: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
