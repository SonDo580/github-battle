import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const styles = {
  fontSize: "14px",
  position: "absolute",
  left: "0",
  right: "0",
  marginTop: "20px",
  textAlign: "center",
};

function Delayed({ children, wait = 300 }) {
  const [show, setShow] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShow(true);
    }, wait);

    return () => clearTimeout(timerRef.current);
  }, []);

  return show ? children : null;
}

Delayed.propTypes = {
  wait: PropTypes.number,
  children: PropTypes.node,
};

export default function Loading({ text = "Loading", speed = 300 }) {
  const [content, setContent] = useState(text);

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      content === text + "..."
        ? setContent(text)
        : setContent((content) => content + ".");
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <Delayed>
      <p style={styles}>{content}</p>
    </Delayed>
  );
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};
