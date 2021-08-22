import React, { useRef } from "react";

export const DropGridCell = ({
  updateOnObstructionDrop,
  id,
  blocked,
  visited,
}) => {
  const ref = useRef(null);

  function drop(e) {
    if (!e.dataTransfer.getData("dragged-item")) return;
    updateOnObstructionDrop(
      e.dataTransfer.getData("dragged-item"),
      ref.current.id
    );
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function getBackgroundColor() {
    if (blocked) {
      return "#343a40";
    }
    if (visited) {
      return "#339af0";
    }
  }
  return (
    <div
      ref={ref}
      id={id}
      onDrop={drop}
      onDragOver={dragOver}
      style={{
        width: "50px",
        height: "50px",
        borderBottom: "1px solid #868e96",
        borderRight: "1px solid #868e96",
        backgroundColor: getBackgroundColor(),
        transition: "all 0.5s",
      }}
    ></div>
  );
};
