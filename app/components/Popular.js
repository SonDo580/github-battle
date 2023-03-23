import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import Table from "./Table";

function LanguagesNav(props) {
  const { updateLanguage, selectedLanguage } = props;

  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

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

export default class Popular extends Component {
  state = {
    selectedLanguage: "All",
    repos: null,
    error: null,
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = (selectedLanguage) => {
    this.setState({
      selectedLanguage,
      error: null,
    });

    fetchPopularRepos(selectedLanguage)
      .then((repos) =>
        this.setState({
          repos,
          error: null,
        })
      )
      .catch((error) => {
        console.warn("Error fetching repos: ", error);

        this.setState({
          error: "Error fetching repos",
        });
      });
  };

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <main className="stack main-stack animate-in">
        <div className="split">
          <h1>Polular</h1>
          <LanguagesNav
            selectedLanguage={selectedLanguage}
            updateLanguage={this.updateLanguage}
          />
        </div>

        {error && <p className="text-center error">{error}</p>}

        {repos && <Table repos={repos} />}
      </main>
    );
  }
}
