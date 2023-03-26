import React from "react";
import PropTypes from "prop-types";
import useHover from "../hooks/useHover";

const container = {
  position: "relative",
  display: "flex",
};

export default function Tooltip({ children, element }) {
  const { hovering, mouseOver, mouseOut } = useHover();

  return (
    <div style={container} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      {hovering && element}
      {children}
    </div>
  );
}

Tooltip.propTypes = {
  element: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
