import React from "react";
import PropTypes from "prop-types";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { generateGridData, generateObstructionData } from "../util";

const GridCreationContainer = ({
  gridColumn,
  setGridColumn,
  gridRow,
  setGridRow,
  obstructions,
  setObstructions,
  setShowSimulator,
  setObstructionData,
  setGridData,
}) => {
  function generateDataBasedOnSimulatorInput() {
    setGridData(generateGridData(gridRow, gridColumn));
    setObstructionData(generateObstructionData(obstructions));
    setShowSimulator(true);
  }

  return (
    <div className="grid-creation-container">
      <h3>Grid Creation</h3>
      <div className="grid-input-container">
        <h4>Number of rows</h4>
        <InputRange
          maxValue={10}
          minValue={0}
          value={gridRow}
          onChange={(value) => setGridRow(value)}
        />
      </div>
      <div className="grid-input-container">
        <h4>Number of columns</h4>
        <InputRange
          maxValue={10}
          minValue={0}
          value={gridColumn}
          onChange={(value) => setGridColumn(value)}
        />
      </div>
      <div className="grid-input-container">
        <h4>Number of obstructions</h4>
        <InputRange
          maxValue={10}
          minValue={0}
          value={obstructions}
          onChange={(value) => setObstructions(value)}
        />
      </div>
      <button
        className="btn-default"
        onClick={() => generateDataBasedOnSimulatorInput()}
      >
        Next
      </button>
    </div>
  );
};

GridCreationContainer.propTypes = {};

export default GridCreationContainer;
