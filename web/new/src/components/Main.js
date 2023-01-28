import React from "react";

export default class Main extends React.Component {
  render() {
    return (
      <main>
        <div className="wrap main--text">
          <h1 className="main--text">
            A highly efficient, powerful, and feature-rich algorithm for
            analyzing DNA sequences
          </h1>
          <div className="button--div">
            <a
              href="https://github.com/Verisimilitude11/DNAnalyzer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="button">Github Repo</button>
            </a>
            <a href="https://discord.gg/xNpujz49gj" target="_blank" rel="noopener noreferrer">
              <button className="button">Discord Server</button>
            </a>
          </div>
        </div>
      </main>
    );
  }
}
