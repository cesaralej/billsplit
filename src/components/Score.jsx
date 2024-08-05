// src/components/Score.js
import PropTypes from "prop-types";

const Score = ({ score }) => {
  return (
    <div>
      <h2>Your Score: {score}</h2>
    </div>
  );
};

Score.propTypes = {
    score: PropTypes.number.isRequired,
    };

export default Score;
