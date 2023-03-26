import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import Table from "./Table";
import Loading from "./Loading";

const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];

function LanguagesNav({ updateLanguage, selectedLanguage }) {
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

const initialState = {
  selectedLanguage: "All",
  loading: true,
  repos: null,
  error: null,
};

function popularReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, selectedLanguage: action.payload };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: null, repos: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: "Error fetching repos" };
    default:
      return state;
  }
}

export default function Popular() {
  const [state, dispatch] = useReducer(popularReducer, initialState);
  const { selectedLanguage, loading, repos, error } = state;

  useEffect(() => {
    updateLanguage(selectedLanguage);
  }, []);

  const updateLanguage = (selectedLanguage) => {
    dispatch({
      type: "FETCH_INIT",
      payload: selectedLanguage,
    });

    fetchPopularRepos(selectedLanguage)
      .then((repos) =>
        dispatch({
          type: "FETCH_SUCCESS",
          payload: repos,
        })
      )
      .catch((error) => {
        console.warn("Error fetching repos: ", error);

        dispatch({
          type: "FETCH_ERROR",
        });
      });
  };

  if (loading) {
    return <Loading text="Fetching repos" />;
  }

  return (
    <main className="stack main-stack animate-in">
      <div className="split">
        <h1>Polular</h1>
        <LanguagesNav
          selectedLanguage={selectedLanguage}
          updateLanguage={updateLanguage}
        />
      </div>

      {error ? (
        <p className="text-center error">{error}</p>
      ) : (
        repos && <Table repos={repos} />
      )}
    </main>
  );
}
