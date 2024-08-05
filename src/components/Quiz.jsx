// src/components/Quiz.js
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function generateDivisionOperations(targetAnswers, minDivisor, maxDivisor) {
  const operations = [];

  for (let answer of targetAnswers) {
    for (let divisor = minDivisor; divisor <= maxDivisor; divisor++) {
      const dividend = answer * divisor;
      operations.push({ question: `${dividend} ÷ ${divisor}`, answer });
    }
  }

  return operations;
}

// Define the range of answers and divisors
const targetAnswers = [6, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29];
const minDivisor = 3;
const maxDivisor = 7;

// Generate the operations
const operations = generateDivisionOperations(
  targetAnswers,
  minDivisor,
  maxDivisor
);

const penaltyTime = 3000; // 3 seconds penalty duration

const Quiz = ({ onScoreChange, isTimeUp }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [penaltyActive, setPenaltyActive] = useState(false); // Track penalty status

  useEffect(() => {
    if (!isTimeUp) {
      generateQuestion();
    }
  }, [isTimeUp]);

  useEffect(() => {
    if (penaltyActive) {
      const timer = setTimeout(() => {
        setPenaltyActive(false); // Re-enable submit button after 3 seconds
      }, penaltyTime); // 3 seconds penalty duration

      return () => clearTimeout(timer); // Cleanup on unmount or penalty change
    }
  }, [penaltyActive]);


  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * operations.length);
    setCurrentQuestion(operations[randomIndex]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (penaltyActive) return; // Do nothing if penalty is active

    if (parseInt(userAnswer) === currentQuestion.answer) {
      // Correct answer logic
      setScore(score + 1);
      onScoreChange(score + 1);
      generateQuestion(); // Function to generate a new question
    } else {
      // Incorrect answer logic
      setPenaltyActive(true);
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
              disabled={penaltyActive || isTimeUp} // Disable if penalty or time is up
            />
            <button type="submit" disabled={penaltyActive || isTimeUp}>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

  Quiz.propTypes = {
  onScoreChange: PropTypes.func.isRequired,
  isTimeUp: PropTypes.bool.isRequired,
};


export default Quiz;
