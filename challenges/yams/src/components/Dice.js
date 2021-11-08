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

const Dice = (props) => {
  const fontSize = "150px";
  let dice;
  switch (props.number) {
    case 1:
      dice = (
        <FontAwesomeIcon
          icon={faDiceOne}
          style={{ fontSize: fontSize }}
          className="me-3"
        />
      );
      break;
    case 2:
      dice = (
        <FontAwesomeIcon
          icon={faDiceTwo}
          style={{ fontSize: fontSize }}
          className="me-3"
        />
      );
      break;
    case 3:
      dice = (
        <FontAwesomeIcon
          icon={faDiceThree}
          style={{ fontSize: fontSize }}
          className="me-3"
        />
      );
      break;
    case 4:
      dice = (
        <FontAwesomeIcon
          icon={faDiceFour}
          style={{ fontSize: fontSize }}
          className="me-3"
        />
      );
      break;
    case 5:
      dice = (
        <FontAwesomeIcon
          icon={faDiceFive}
          style={{ fontSize: fontSize }}
          className="me-3"
        />
      );
      break;
    case 6:
      dice = (
        <FontAwesomeIcon
          icon={faDiceSix}
          style={{ fontSize: fontSize }}
          className="me-3"
        />
      );
      break;
  }
  return dice;
};

export default Dice;
