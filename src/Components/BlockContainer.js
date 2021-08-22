import React from "react";
import PropTypes from "prop-types";
import Draggable from "./Draggable";

const BlockContainer = ({ blockModel }) => {
  function generateBlock() {
    const generatedBlock = blockModel.map((model) => {
      const { id, draggable } = model;
      return <Draggable key={id} draggable={draggable} id={id} />;
    });
    return generatedBlock;
  }

  return <div className="block-container">{generateBlock()}</div>;
};

BlockContainer.propTypes = {
  blockModel: PropTypes.array.isRequired,
};

export default BlockContainer;
