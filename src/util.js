import { WaterFlowManager } from "./WaterFlowManager";

export function updateGridOnObstructionDrop(droppedId, gridData, row, column) {
  const grid = generateNewGrid(row, column);
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    for (let colIndex = 0; colIndex < column; colIndex++) {
      const { id } = gridData[rowIndex][colIndex];
      if (id === droppedId) grid[rowIndex][colIndex] = { id, value: -1 };
      else grid[rowIndex][colIndex] = gridData[rowIndex][colIndex];
    }
  }
  console.log("updateGridOnObstructionDrop", grid);
  return grid;
}

export function updateWaterFlowPath(
  row,
  column,
  rowStartIndex,
  columnStartIndex,
  gridData
) {
  const waterFlowManager = new WaterFlowManager(
    row,
    column,
    rowStartIndex,
    columnStartIndex
  );
  return waterFlowManager.simulateWaterFlow(gridData);
}

export function generateNewGrid(row, column) {
  let grid = new Array(row);
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    grid[rowIndex] = new Array(column);
  }
  return grid;
}

export function generateObstructionData(num) {
  const obstructions = [];
  for (let index = 0; index < num; index++) {
    obstructions.push({ id: `index-${index}`, draggable: true });
  }
  return obstructions;
}

export function generateGridData(row, column) {
  let grid = generateNewGrid(row, column);
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    for (let colIndex = 0; colIndex < column; colIndex++) {
      grid[rowIndex][colIndex] = {
        id: `item-${rowIndex + 1}-${colIndex + 1}`,
        value: 0,
      };
    }
  }
  return grid;
}
