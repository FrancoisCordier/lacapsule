import React, { useState } from "react";
import "./App.css";
import Dice from "./components/Dice";
import ScoreGrid from "./components/ScoreGrid";
import { Button } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [dicesValues, setDicesValues] = useState([1, 1, 1, 1, 1]);
  const [diceRollCounter, setDiceRollCounter] = useState([0, 0, 0, 0, 0]);
  const [isSelected, setIsSelected] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [rollCounter, setRollCounter] = useState(0);

  const randomDices = () => {
    setDicesValues(
      dicesValues.map((el, index) => {
        if (isSelected[index]) return el;
        else {
          setDiceRollCounter(
            diceRollCounter.map((value, index) => {
              return !isSelected[index] ? value + 1 : value;
            })
          );
          setRollCounter(rollCounter + 1);
          return Math.floor(Math.random() * 6) + 1;
        }
      })
    );
  };

  const selectDice = (index) => {
    setIsSelected([
      ...isSelected.slice(0, index),
      !isSelected[index],
      ...isSelected.slice(index + 1),
    ]);
  };

  return (
    <div className="App" style={{ backgroundColor: "#98c1d9" }}>
      <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="row mb-5">
          <h1>{dicesValues.reduce((a, b) => a + b) === 30 ? "Bravo !" : ""}</h1>
          <h2>
            <span className="badge" style={{ backgroundColor: "#023047" }}>
              Score : {dicesValues.reduce((a, b) => a + b)}
            </span>
          </h2>
          <h2>
            <span className="badge" style={{ backgroundColor: "#023047" }}>
              Roll n°{rollCounter}
            </span>
          </h2>
        </div>
        <div className="row mb-5">
          {dicesValues.map((el, index) => (
            <Dice
              key={index}
              value={el}
              diceRollCounter={diceRollCounter[index]}
              isSelected={isSelected[index]}
              selectDice={selectDice}
              diceIndex={index}
            />
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
