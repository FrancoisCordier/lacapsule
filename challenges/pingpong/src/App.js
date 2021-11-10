import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [ballPosition, setBallPosition] = useState(null);
  const [gameStatus, setGameStatus] = useState(true);

  const caseClick = (target) => {
    if (gameStatus) {
      if (target.id === "1" || target.id === "4") {
        setBallPosition(Math.floor(Math.random() * (8 - 5 + 1) + 5));
      } else if (target.id === "5" || target.id === "8") {
        setBallPosition(Math.floor(Math.random() * (4 - 1 + 1) + 1));
      }
      setGameStatus(!gameStatus);
    } else {
      if (ballPosition === Number(target.id)) {
        if (target.id === "2" || target.id === "3")
          setBallPosition(Math.floor(Math.random() * (8 - 5 + 1) + 5));
        else if (target.id === "6" || target.id === "7")
          setBallPosition(Math.floor(Math.random() * (4 - 1 + 1) + 1));
      }
    }
  };

  let message = "";
  if ([1, 4, 5, 8].includes(ballPosition)) {
    message = "Game over";
  }

  const gameZone = [
    {
      index: 1,
      color: "white",
      width: "1rem",
      display: "d-flex justify-content-end",
    },
    {
      index: 2,
      color: "success",
      width: "",
      display: "",
    },
    { index: 3, color: "success", width: "", display: "" },
    { index: 4, color: "white", width: "1rem", display: "" },
    {
      index: 5,
      color: "white",
      width: "1rem",
      display: "d-flex justify-content-end",
    },
    { index: 6, color: "success", width: "", display: "" },
    { index: 7, color: "success", width: "", display: "" },
    { index: 8, color: "white", width: "1rem", display: "" },
  ];

  const table = gameZone.map((el, index) => {
    return (
      <div key={index} className={`col-3 ${el.display}`}>
        <div
          className={`bg-${el.color} h-100 d-flex justify-content-center align-items-center`}
          onClick={(e) => caseClick(e.currentTarget)}
          id={el.index}
          style={{ width: el.width }}
        >
          {ballPosition === el.index ? (
            <FontAwesomeIcon icon={faCircle} />
          ) : null}
        </div>
      </div>
    );
  });

  return (
    <div className="App vh-100 bg-dark">
      <div className="container h-100 p-5">
        <div className="row h-100 g-1">{table}</div>
        <p className="text-white fs-4">{message}</p>
      </div>
    </div>
  );
}

export default App;
