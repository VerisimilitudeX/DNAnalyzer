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
              <button type="button" onClick={event =>  window.location.href="https://github.com/Verisimilitude11/DNAnalyzer"} className="button">Github Repo</button>
              <button type="button" onClick={event =>  window.location.href="https://discord.gg/xNpujz49gj"} className="button">Discord Server</button>
          </div>
        </div>
      </main>
    );
  }
}
