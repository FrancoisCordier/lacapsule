import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

const Dice = ({ value, rollCounter }) => {
  // const randomDiceNumber = () => {
  //   return Math.floor(Math.random() * 6) + 1;
  // };

  // const onDiceClick = () => {
  //   setDiceNumber(randomDiceNumber());
  //   setDiceChangeCounter(diceChangeCounter + 1);
  // };
  const fontSize = "150px";
  let dice;

  const diceCreator = (faDice) => {
    return (
      <div className="col d-flex flex-column align-items-center me-2">
        <FontAwesomeIcon
          icon={faDice}
          style={{ fontSize: fontSize }}
          // onClick={() => {
          //   onDiceClick();
          // }}
        />
        <h2>
          <span className="badge" style={{ backgroundColor: "#023047" }}>
            {rollCounter}
          </span>
        </h2>
      </div>
    );
  };

  switch (value) {
    case 1:
      dice = diceCreator(faDiceOne);
      break;
    case 2:
      dice = diceCreator(faDiceTwo);
      break;
    case 3:
      dice = diceCreator(faDiceThree);
      break;
    case 4:
      dice = diceCreator(faDiceFour);
      break;
    case 5:
      dice = diceCreator(faDiceFive);
      break;
    case 6:
      dice = diceCreator(faDiceSix);
      break;
    default:
      dice = "ERROR";
      break;
  }
  return dice;
};

// export { randomDiceNumber };
export default Dice;
