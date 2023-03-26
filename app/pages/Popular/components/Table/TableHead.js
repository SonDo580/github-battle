import React from "react";
import { hashtag } from "../../../../components/icons";

export default function TableHead() {
  return (
    <thead>
      <tr>
        <th style={{ width: "5%" }}>{hashtag}</th>
        <th style={{ width: "50%" }}>Repository</th>
        <th style={{ width: "15%" }}>Stars</th>
        <th style={{ width: "15%" }}>Forks</th>
        <th style={{ width: "15%" }}>Open Issue</th>
      </tr>
    </thead>
  );
}
