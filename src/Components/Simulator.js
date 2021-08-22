import PropTypes from "prop-types";

const Simulator = ({ colindex, setStartIndex }) => {
  function generateSimulator() {
    let simulator = [];
    for (let index = 0; index < colindex; index++) {
      simulator.push(
        <div
          className="simulation-block"
          id={index}
          key={index}
          onClick={() => setStartIndex(index)}
        ></div>
      );
    }
    return simulator;
  }
  return <div>{generateSimulator()}</div>;
};

Simulator.propTypes = {
  colindex: PropTypes.number.isRequired,
};

export default Simulator;
