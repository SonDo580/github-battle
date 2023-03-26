import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { close } from "./icons";

function Instructions() {
  return (
    <section className="instructions-container">
      <h2>Instructions</h2>
      <ol>
        <li>Enter 2 Github users</li>
        <li>Battle</li>
        <li>See the winners</li>
      </ol>
    </section>
  );
}

function PlayerInput({ label, onSubmit }) {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(username);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label htmlFor="username" className="player-label">
        {label}
      </label>
      <div className="input-row">
        <input
          type="text"
          id="username"
          placeholder="github username"
          autoComplete="off"
          value={username}
          onChange={handleChange}
        />
        <button className="btn link" type="submit" disabled={!username}>
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

function PlayerPreview({ username, onReset, label }) {
  return (
    <article className="card">
      <h3 className="player-label">{label}</h3>
      <div className="split">
        <div className="row gap-md">
          <img
            width={32}
            height={32}
            className="avatar"
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />

          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>

        <button onClick={onReset} className="btn secondary icon">
          {close}
        </button>
      </div>
    </article>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default function Battle() {
  const [players, setPlayers] = useState({
    player1: null,
    player2: null,
  });

  const handleSubmit = (id, player) => {
    setPlayers({
      ...players,
      [id]: player,
    });
  };

  const handleReset = (id) => {
    setPlayers({
      ...players,
      [id]: null,
    });
  };

  const { player1, player2 } = players;
  const disabled = !player1 || !player2;

  return (
    <main className="stack main-stack animate-in">
      <div className="split">
        <h1>Players</h1>
        <Link
          to={{
            pathname: "/result",
            search: `?player1=${player1}&player2=${player2}`,
          }}
          className={`btn primary ${disabled ? "disabled" : ""}`}
        >
          Battle
        </Link>
      </div>

      <section className="grid">
        {player1 === null ? (
          <PlayerInput
            label="Player 1"
            onSubmit={(player) => handleSubmit("player1", player)}
          />
        ) : (
          <PlayerPreview
            label="Player 1"
            username={player1}
            onReset={() => handleReset("player1")}
          />
        )}
        {player2 === null ? (
          <PlayerInput
            label="Player 2"
            onSubmit={(player) => handleSubmit("player2", player)}
          />
        ) : (
          <PlayerPreview
            label="Player 2"
            username={player2}
            onReset={() => handleReset("player2")}
          />
        )}
      </section>

      <Instructions />
    </main>
  );
}
