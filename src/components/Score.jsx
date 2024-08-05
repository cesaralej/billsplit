// src/components/Score.js
import PropTypes from "prop-types";

const Score = ({ score }) => {
  return (
    <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-lg text-center max-w-xs mx-auto mt-4">
      <h2 className="text-3xl font-bold">Your Score: {score}</h2>
    </div>
  );
};

Score.propTypes = {
    score: PropTypes.number.isRequired,
    };

export default Score;
