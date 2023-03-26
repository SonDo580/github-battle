import React, { useState } from "react";
import { Link } from "react-router-dom";

import Instructions from "./components/Instructions";
import PlayerInput from "./components/PlayerInput";
import PlayerPreview from "./components/PlayerPreview";

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
