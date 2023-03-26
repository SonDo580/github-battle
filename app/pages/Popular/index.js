import React, { useEffect, useReducer } from "react";

import { fetchPopularRepos } from "../../utils/api";

import Loading from "../../components/Loading";
import LanguagesNav from "./components/LanguagesNav";
import Table from "./components/Table";

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
