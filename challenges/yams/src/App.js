import React, { useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [dicesValues, setDicesValues] = useState([1, 1, 1, 1, 1]);
  const [diceRollCounter, setDiceRollCounter] = useState(0);

  const randomDices = () => {
    for (let i = 0; i < 5; i++) {
      setDicesValues([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ]);
    }
    setDiceRollCounter(diceRollCounter + 1);
  };

  return (
    <div className="App" style={{ backgroundColor: "#98c1d9" }}>
      <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="row mb-5">
          <h1>
            <span className="badge" style={{ backgroundColor: "#023047" }}>
              Score : {dicesValues.reduce((a, b) => a + b)}
            </span>
          </h1>
        </div>
        <div className="row mb-5">
          {dicesValues.map((el, index) => (
            <Dice key={index} value={el} rollCounter={diceRollCounter} />
          ))}
        </div>
        <div className="row">
          <Button color="danger" size="lg" onClick={() => randomDices()}>
            Lancer les dés
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
