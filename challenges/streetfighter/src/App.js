import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentPlayer, setcurrentPlayer] = useState(1);
  const [playerOneSelected, setplayerOneSelected] = useState(null);
  const [playerTwoSelected, setplayerTwoSelected] = useState(null);

  const playerSelected = (name) => {
    if (currentPlayer == 1) {
      setcurrentPlayer(2);
      setplayerOneSelected(name);
    }
  };

  let playerOne;
  if (playerOneSelected) {
    playerOne = <Player name="" player="" />;
  }

  let playerTwo;

  return (
    <div
      style={{ marginTop: "50px", display: "flex", justifyContent: "center" }}
    >
      <div style={{ width: "200px" }}>{playerOne}</div>
      <div
        style={{
          width: "200px",
          marginLeft: "50px",
          marginRight: "50px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{ width: "100%", paddingBottom: "50px" }}
          src="./images/player-select.jpg"
        />

        <div
          style={{
            cursor: "pointer",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex", height: "53px" }}></div>
          <div style={{ display: "flex", height: "53px" }}></div>
        </div>
      </div>
      <div style={{ width: "200px" }}>{playerTwo}</div>
    </div>
  );
}

function PlayerPicto() {
  const [selected, setselected] = useState(null);

  return (
    <div style={{ width: "25%", position: "relative" }}>
      <img
        style={{ width: "101%", position: "absolute", top: "-5px" }}
        src=""
      />
      <img style={{ width: "100%" }} src="" />
    </div>
  );
}

function Player() {
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <img style={{ width: "40%" }} src="" />
      <img style={{ width: "100%" }} src="" />
    </div>
  );
}

export default App;
