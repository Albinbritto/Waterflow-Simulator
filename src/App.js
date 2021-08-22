import "./App.css";
import BlockContainer from "./Components/BlockContainer";
import WaterFlowContainer from "./Components/WaterFlowContainer";
import { useState, useEffect } from "react";
import GridCreationContainer from "./Components/GridCreationContainer";
import Simulator from "./Components/Simulator";
import { updateGridOnObstructionDrop, updateWaterFlowPath } from "./util";
import { generateGridData, generateObstructionData } from "./util";

function App() {
  const [gridRow, setGridRow] = useState(1);
  const [gridColumn, setGridColumn] = useState(1);
  const [obstructions, setObstructions] = useState(1);
  const [showSimulator, setShowSimulator] = useState(false);
  const [obstructionData, setObstructionData] = useState([]);
  const [gridData, setGridData] = useState(null);
  const [startIndex, setStartIndex] = useState(-1);
  const [enableSimulationBtn, setEnableSimulationBtn] = useState(false);
  const [showSimulationRow, setShowSimulationRow] = useState(false);

  useEffect(() => {
    if (startIndex !== -1) {
      setGridData(
        updateWaterFlowPath(gridRow, gridColumn, 0, startIndex, gridData)
      );
    }
  }, [startIndex]);

  function updateOnObstructionDrop(draggedItemId, droppedId) {
    let enableSimulationBtn = true;
    const updatedData = obstructionData.map((block) => {
      const { id } = block;
      if (draggedItemId === id) {
        block.draggable = false;
      }
      if (block.draggable) {
        enableSimulationBtn = false;
      }
      return block;
    });
    setGridData(
      updateGridOnObstructionDrop(droppedId, gridData, gridRow, gridColumn)
    );
    setObstructionData(updatedData);
    setEnableSimulationBtn(enableSimulationBtn);
  }

  function reset() {
    setGridData(generateGridData(gridRow, gridColumn));
    setObstructionData(generateObstructionData(obstructions));
    setShowSimulationRow(false);
    setEnableSimulationBtn(false);
    setStartIndex(-1);
  }

  function back() {
    setShowSimulator(false);
    setShowSimulationRow(false);
    setEnableSimulationBtn(false);
    setStartIndex(-1);
  }

  return (
    <div className="app-container">
      <section className="section-main">
        <h2>Waterflow simulator</h2>
        {showSimulator ? (
          <div className="water-flow-simulator-container">
            <p>Drag the obstructions and place it inside the grid</p>
            {showSimulationRow ? (
              <Simulator
                colindex={gridColumn}
                setStartIndex={setStartIndex}
              ></Simulator>
            ) : null}
            <div className="water-flow-simulator">
              <WaterFlowContainer
                gridRow={gridRow}
                gridColumn={gridColumn}
                gridData={gridData}
                updateOnObstructionDrop={updateOnObstructionDrop}
              ></WaterFlowContainer>
              <BlockContainer blockModel={obstructionData}></BlockContainer>
            </div>
            <button className="btn-default" onClick={() => back()}>
              Back
            </button>
            {showSimulationRow ? (
              <button
                className="btn-default mrg-left-10"
                onClick={() => reset()}
              >
                Reset
              </button>
            ) : (
              <button
                className={
                  enableSimulationBtn
                    ? "btn-default mrg-left-10"
                    : "btn-default mrg-left-10 btn-blocked"
                }
                onClick={() => {
                  enableSimulationBtn && setShowSimulationRow(true);
                }}
              >
                Start simulation
              </button>
            )}
          </div>
        ) : (
          <GridCreationContainer
            gridRow={gridRow}
            gridColumn={gridColumn}
            obstructions={obstructions}
            setShowSimulator={setShowSimulator}
            setGridRow={setGridRow}
            setGridColumn={setGridColumn}
            setObstructions={setObstructions}
            setObstructionData={setObstructionData}
            setGridData={setGridData}
          ></GridCreationContainer>
        )}
      </section>
    </div>
  );
}

export default App;
