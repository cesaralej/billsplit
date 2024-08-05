// src/components/Timer.js
import { useState, useEffect } from "react";
import { QUIZ_TIME } from "../config/quizConfig";
import PropTypes from "prop-types";

const Timer = ({ onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME);
  //console.log("Timer")

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      console.log("Time up!");
      onTimeUp();
    }
  }, [onTimeUp, timeLeft]);

  return (
    <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg shadow-lg text-center max-w-xs mx-auto">
      <h2 className="text-4xl font-bold">{timeLeft}s</h2>
      <p className="text-lg font-medium">Time Left</p>
    </div>
  );
};

Timer.propTypes = {
    onTimeUp: PropTypes.func.isRequired,
    };

export default Timer;
