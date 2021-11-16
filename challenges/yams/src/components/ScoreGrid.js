import React from "react";
import { Table, Badge } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

const ScoreGrid = () => {
  const [grid, setGrid] = [
    { name: "AS", value: "" },
    { name: "DEUX", value: "" },
    { name: "TROIS", value: "" },
    { name: "QUATRE", value: "" },
    { name: "CINQ", value: "" },
    { name: "SIX", value: "" },
    { name: "TOTAL I", value: "" },
    { name: "MINIMUM", value: "" },
    { name: "MAXIMUM ", value: "" },
    { name: "TOTAL II", value: "" },
  ];

  const createGrid = (name) => {
    const caseValue = grid.find((elem) => elem.name === name).value;
    console.log(caseValue);
    return <td onClick={(name) => {}}>{caseValue}</td>;
  };

  return (
    <Table bordered className="border-dark">
      <thead></thead>
      <tbody>
        <tr>
          <th scope="row">AS</th>
          {createGrid("AS")}
        </tr>
        <tr>
          <th scope="row">DEUX</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">TROIS</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">QUATRE</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">CINQ</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">SIX</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">TOTAL I</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">MAXIMUM</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">MINIMUM</th>
          <td></td>
        </tr>
        <tr>
          <th scope="row">TOTAL II</th>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ScoreGrid;
