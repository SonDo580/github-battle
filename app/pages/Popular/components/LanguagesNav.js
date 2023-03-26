import React from "react";
import PropTypes from "prop-types";

const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

export default function LanguagesNav({ updateLanguage, selectedLanguage }) {
  return (
    <select
      value={selectedLanguage}
      onChange={(event) => updateLanguage(event.target.value)}
    >
      {languages.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}

LanguagesNav.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  updateLanguage: PropTypes.func.isRequired,
};
