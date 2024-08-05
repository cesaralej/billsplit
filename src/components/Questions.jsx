// src/components/Questions.js
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  TARGET_ANSWERS,
  MIN_DIVISOR,
  MAX_DIVISOR,
  PENALTY_TIME,
} from "../config/quizConfig";

import PropTypes from "prop-types";

function generateDivisionOperations(targetAnswers, minDivisor, maxDivisor) {
  const operations = [];
  console.log("Function: Create Operations");

  for (let answer of targetAnswers) {
    for (let divisor = minDivisor; divisor <= maxDivisor; divisor++) {
      const dividend = answer * divisor;
      operations.push({ question: `${dividend} ÷ ${divisor}`, answer });
    }
  }

  return operations;
}

const Questions = ({ onScoreChange }) => {
  console.log("Render: Questions");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [penaltyTimeLeft, setPenaltyTimeLeft] = useState(0); // Track penalty time left

  // Generate questions. Memoize to avoid recalculation
  const operations = useMemo(
    () => generateDivisionOperations(TARGET_ANSWERS, MIN_DIVISOR, MAX_DIVISOR),
    []
  );

  const generateQuestion = useCallback(() => {
    console.log("Callback: New Question");
    const randomIndex = Math.floor(Math.random() * operations.length);
    setCurrentQuestion(operations[randomIndex]);
  }, [operations]);

  //TODO This effect kicks off the first question. But then the callback runs. Do we only need the callback?
  useEffect(() => {
    console.log("Effect: New Question");
    generateQuestion();
  }, [generateQuestion]);

  useEffect(() => {
    console.log("Effect: Penalty");
    if (penaltyTimeLeft > 0) {
      const timer = setTimeout(() => {
        setPenaltyTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup on unmount or penalty change
    }
  }, [penaltyTimeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (penaltyTimeLeft) return; // Do nothing if penalty is active

    if (parseInt(userAnswer) === currentQuestion.answer) {
      console.log("Correct Answer");
      onScoreChange((prevScore) => prevScore + 1);
      generateQuestion(); // Function to generate a new question
    } else {
      // Incorrect answer logic
      console.log("%cIncorrect Answer", "color: red");
      setPenaltyTimeLeft(PENALTY_TIME);
    }

    setUserAnswer(""); // Clear the input field
  };

  return (
    <div>
      {currentQuestion && (
        <div>
          <h2>{currentQuestion.question}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={penaltyTimeLeft} // Disable if penalty
            />
            <button type="submit" disabled={penaltyTimeLeft}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

  Questions.propTypes = {
    onScoreChange: PropTypes.func.isRequired,
  };


export default Questions;
