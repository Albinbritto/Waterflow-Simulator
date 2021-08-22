import React, { useState, useRef, Fragment } from "react";

const Draggable = ({ id, draggable }) => {
  const ref = useRef(null);

  function dragStart(e) {
    console.log("dragStart", e.target);
    e.dataTransfer.setData("dragged-item", ref.current.id);
  }
  return (
    <Fragment>
      {draggable ? (
        <div
          ref={ref}
          id={id}
          draggable={draggable}
          className="block"
          onDragStart={dragStart}
        ></div>
      ) : (
        <div className="block-dragged" id={id}></div>
      )}
    </Fragment>
  );
};

export default Draggable;
