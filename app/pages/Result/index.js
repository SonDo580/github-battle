import React, { useEffect, useReducer } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { battle } from "../../utils/api";

import Loading from "../../components/Loading";
import Card from "./Card";

const initialState = {
  winner: null,
  loser: null,
  error: null,
  loading: true,
};

function resultReducer(state, action) {
  switch (action.type) {
    case "BATTLE_INIT":
      return { ...state, loading: true };
    case "BATTLE_SUCCESS":
      return {
        ...state,
        loading: false,
        error: null,
        winner: action.payload[0],
        loser: action.payload[1],
      };
    case "BATTLE_ERROR":
      return {
        ...state,
        loading: false,
        error: "Error battling",
      };
    default:
      return state;
  }
}

export default function Result() {
  const [state, dispatch] = useReducer(resultReducer, initialState);

  const searchParams = useSearchParams()[0];
  const player1 = searchParams.get("player1");
  const player2 = searchParams.get("player2");

  useEffect(() => {
    dispatch({
      type: "BATTLE_INIT",
    });

    battle([player1, player2])
      .then((players) => {
        dispatch({
          type: "BATTLE_SUCCESS",
          payload: players,
        });
      })
      .catch((err) => {
        dispatch({
          type: "BATTLE_ERROR",
        });
      });
  }, []);

  const { winner, loser, error, loading } = state;

  if (loading) {
    return <Loading text="Battling" />;
  }

  if (error) {
    return <p className="text-center error">{error}</p>;
  }

  return (
    <main className="animate-in stack main-stack">
      <div className="split">
        <h1>Results</h1>
        <Link to="/battle" className="btn secondary">
          Reset
        </Link>
      </div>

      <section className="grid">
        <article className="results-container">
          <Card profile={winner.profile} />
          <p className="results">
            <span>
              {winner.score === loser.score ? "Tie" : "Winner"}{" "}
              {winner.score.toLocaleString()}
            </span>

            {winner.score !== loser.score && (
              <img
                width={80}
                src="https://ui.dev/images/certificate.svg"
                alt="Certificate"
              />
            )}
          </p>
        </article>

        <article className="results-container">
          <Card profile={loser.profile} />
          <p className="results">
            <span>
              {winner.score === loser.score ? "Tie" : "Loser"}{" "}
              {loser.score.toLocaleString()}
            </span>
          </p>
        </article>
      </section>
    </main>
  );
}
