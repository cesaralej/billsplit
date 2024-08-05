// src/pages/HomePage.js
import { useState } from "react";
import Quiz from "../components/Quiz";
import Timer from "../components/Timer";
import Score from "../components/Score";

const HomePage = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [previousScore, setPreviousScore] = useState(null);

  const startQuiz = () => {
    setScore(0); // Reset score
    setIsTimeUp(false); // Reset timer status
    setQuizStarted(true); // Start the quiz
  };

  const stopQuiz = () => {
    setPreviousScore(score); // Save the previous score
    setIsTimeUp(true);
    setQuizStarted(false); // End the quiz and show the button again
  };

  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };

  return (
    <>
      <h1>BillSplit Battle</h1>
      {quizStarted ? (
        <div>
          <Timer onTimeUp={stopQuiz} />
          <Quiz onScoreChange={handleScoreChange} isTimeUp={isTimeUp} />
          <Score score={score} />
          <button onClick={stopQuiz}>Stop Quiz</button>
        </div>
      ) : (
        <>
          <button onClick={startQuiz}>Start Quiz</button>
          {previousScore !== null && <p> Previous Score: {previousScore}</p>}
        </>
      )}
    </>
  );
};

export default HomePage;
