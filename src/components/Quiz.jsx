// src/components/Quiz.js
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const operations = [
  { question: "7 x 8", answer: 56 },
  { question: "9 x 6", answer: 54 },
  { question: "12 ÷ 4", answer: 3 },
  // Add more operations here
];

const Quiz = ({ onScoreChange, isTimeUp }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!isTimeUp) {
      generateQuestion();
    }
  }, [isTimeUp]);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * operations.length);
    setCurrentQuestion(operations[randomIndex]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer) === currentQuestion.answer) {
      setScore(score + 1);
      onScoreChange(score + 1);
    }
    setUserAnswer("");
    generateQuestion();
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
              disabled={isTimeUp}
            />
            <button type="submit" disabled={isTimeUp}>
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
