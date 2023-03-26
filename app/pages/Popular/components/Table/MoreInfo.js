import React from "react";
import PropTypes from "prop-types";

export default function MoreInfo({
  created_at,
  forked_count,
  language,
  updated_at,
  watchers,
  login,
}) {
  return (
    <ul className="tooltip stack">
      <li className="split">
        <span>By:</span> <span>{login}</span>
      </li>
      {language && (
        <li className="split">
          <span>Language:</span> <span>{language}</span>
        </li>
      )}
      <li className="split">
        <span>Created:</span>{" "}
        <span>{new Date(created_at).toLocaleDateString()}</span>
      </li>
      <li className="split">
        <span>Updated:</span>{" "}
        <span>{new Date(updated_at).toLocaleDateString()}</span>
      </li>
      <li className="split">
        <span>Watchers:</span>
        <span>{watchers.toLocaleString()}</span>
      </li>
      {forked_count && (
        <li className="split">
          <span>Forked:</span> <span>{forked_count.toLocaleString()}</span>
        </li>
      )}
    </ul>
  );
}

MoreInfo.propTypes = {
  created_at: PropTypes.string.isRequired,
  language: PropTypes.string,
  updated_at: PropTypes.string.isRequired,
  watchers: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
};
