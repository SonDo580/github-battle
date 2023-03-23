import React, { Component } from "react";
import PropTypes from "prop-types";
import { close } from "./icons";
import { Link } from "react-router-dom";

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

class PlayInput extends React.Component {
  state = {
    username: "",
  };

  handleChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state.username);
  };

  render() {
    return (
      <form className="card" onSubmit={this.handleSubmit}>
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>
        <div className="input-row">
          <input
            type="text"
            id="username"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className="btn link"
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

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

export default class Battle extends Component {
  state = {
    player1: null,
    player2: null,
  };

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player,
    });
  };

  handleReset = (id) => {
    this.setState({
      [id]: null,
    });
  };

  render() {
    const { player1, player2 } = this.state;
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
            <PlayInput
              label="Player 1"
              onSubmit={(player) => this.handleSubmit("player1", player)}
            />
          ) : (
            <PlayerPreview
              label="Player 1"
              username={player1}
              onReset={() => this.handleReset("player1")}
            />
          )}
          {player2 === null ? (
            <PlayInput
              label="Player 2"
              onSubmit={(player) => this.handleSubmit("player2", player)}
            />
          ) : (
            <PlayerPreview
              label="Player 2"
              username={player2}
              onReset={() => this.handleReset("player2")}
            />
          )}
        </section>

        <Instructions />
      </main>
    );
  }
}
