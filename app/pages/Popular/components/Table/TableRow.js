import React from "react";
import PropTypes from "prop-types";

import Tooltip from "../../../../components/Tooltip";
import MoreInfo from "./MoreInfo";

export default function TableRow({
  index,
  owner,
  stargazers_count,
  forks,
  open_issues,
  name,
  created_at,
  updated_at,
  language,
  watchers,
}) {
  const { login, avatar_url, type } = owner;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <Tooltip
          element={
            <MoreInfo
              created_at={created_at}
              language={language}
              updated_at={updated_at}
              watchers={watchers}
              type={type}
              login={login}
            />
          }
        >
          <div className="row gap-md">
            <img
              width="32px"
              height="32px"
              className="avatar"
              src={avatar_url}
              alt={`Avatar for ${login}`}
            />
            <a href={`https://github.com/${login}/${name}`}>{name}</a>
          </div>
        </Tooltip>
      </td>
      <td>{stargazers_count}</td>
      <td>{forks}</td>
      <td>{open_issues}</td>
    </tr>
  );
}

TableRow.propTypes = {
  index: PropTypes.number.isRequired,
  owner: PropTypes.object.isRequired,
  stargazers_count: PropTypes.number.isRequired,
  forks: PropTypes.number.isRequired,
  open_issues: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
