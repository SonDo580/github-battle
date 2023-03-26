import React from "react";
import PropTypes from "prop-types";

import TableHead from "./TableHead";
import TableRow from "./TableRow";

export default function Table({ repos }) {
  return (
    <table>
      <TableHead />
      <tbody>
        {repos.map((repo, index) => (
          <TableRow key={index} {...repo} index={index} />
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  repos: PropTypes.array.isRequired,
};
