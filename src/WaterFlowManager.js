export class WaterFlowManager {
  constructor(row, col, rowStartIndex, colStartIndex) {
    this.row = row;
    this.col = col;
    this.colStartIndex = colStartIndex;
    this.rowStartIndex = rowStartIndex;
  }

  generateNewGrid(oldGrid) {
    let grid = new Array(this.row);
    for (let rowIndex = 0; rowIndex < this.row; rowIndex++) {
      grid[rowIndex] = new Array(this.col);
    }

    for (let rowIndex = 0; rowIndex < this.row; rowIndex++) {
      for (let colIndex = 0; colIndex < this.col; colIndex++) {
        grid[rowIndex][colIndex] = oldGrid[rowIndex][colIndex];
      }
    }
    return grid;
  }

  simulateWaterFlow(grid) {
    const newGrid = this.generateNewGrid(grid);
    console.log(newGrid);
    for (let rowIndex = 0; rowIndex < this.row; rowIndex++) {
      for (let colIndex = 0; colIndex < this.col; colIndex++) {
        if (
          newGrid[rowIndex][colIndex].value !== -1 &&
          ((rowIndex === this.rowStartIndex &&
            colIndex === this.colStartIndex) ||
            this.isUpGridCellVisited(rowIndex, colIndex, newGrid))
        ) {
          newGrid[rowIndex][colIndex].value = 1;

          if (this.isDownCellBlocked(rowIndex, colIndex, newGrid)) {
            this.navigateToLeft(rowIndex, colIndex, newGrid);
            this.navigateToRight(rowIndex, colIndex, newGrid);
          }
        } else {
          newGrid[rowIndex][colIndex].value = grid[rowIndex][colIndex].value;
        }
      }
    }
    console.log(grid);
    console.log(newGrid);
    return newGrid;
  }

  isUpGridCellVisited(rowIndex, colIndex, grid) {
    console.log("isUpGridCellVisited", rowIndex, colIndex);
    if (rowIndex !== 0 && grid[rowIndex - 1][colIndex].value === 1) {
      return true;
    }
    return false;
  }

  isDownCellBlocked(rowIndex, colIndex, grid) {
    console.log("isDownCellBlocked", rowIndex, colIndex);
    if (
      rowIndex !== this.row - 1 &&
      grid[rowIndex + 1][colIndex].value === -1
    ) {
      return true;
    }
    return false;
  }

  navigateToLeft(rowIndex, colIndex, grid) {
    console.log(rowIndex, colIndex);
    if (colIndex > 0) {
      if (grid[rowIndex][colIndex - 1].value !== -1) {
        grid[rowIndex][colIndex - 1].value = 1;
        console.log(grid);
        if (this.isDownCellBlocked(rowIndex, colIndex - 1, grid)) {
          this.navigateToLeft(rowIndex, colIndex - 1, grid);
        }
      }
    }
  }

  navigateToRight(rowIndex, colIndex, grid) {
    if (colIndex < this.col - 1) {
      if (grid[rowIndex][colIndex + 1].value !== -1) {
        grid[rowIndex][colIndex + 1].value = 1;
        if (this.isDownCellBlocked(rowIndex, colIndex + 1, grid)) {
          this.navigateToRight(rowIndex, colIndex + 1, grid);
        }
      }
    }
  }
}
