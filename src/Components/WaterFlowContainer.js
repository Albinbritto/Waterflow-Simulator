import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DropGridCell } from "./DropGridCell";

const WaterFlowContainer = ({
  gridData,
  updateOnObstructionDrop,
  gridRow,
  gridColumn,
  children,
}) => {
  function generateGrid(row, column) {
    const gridLayout = [];
    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      for (let colIndex = 0; colIndex < column; colIndex++) {
        const { id, value } = gridData[rowIndex][colIndex];
        const blocked = value === -1 ? true : false;
        const visited = value === 1 ? true : false;
        gridLayout.push(
          <DropGridCell
            key={id}
            id={id}
            blocked={blocked}
            updateOnObstructionDrop={updateOnObstructionDrop}
            visited={visited}
          ></DropGridCell>
        );
      }
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${row},1fr)`,
          gridTemplateColumns: `repeat(${column},1fr)`,
          borderLeft: "1px solid #868e96",
          borderTop: "1px solid #868e96",
          marginTop: "10px",
        }}
      >
        {children}
        {gridLayout}
      </div>
    );
  }
  return <Fragment>{generateGrid(gridRow, gridColumn)}</Fragment>;
};

WaterFlowContainer.propTypes = {
  gridRow: PropTypes.number.isRequired,
  gridColumn: PropTypes.number.isRequired,
};

export default WaterFlowContainer;
