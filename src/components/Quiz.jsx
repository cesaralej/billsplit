// src/pages/HomePage.js
import { useState } from "react";
import Questions from "../components/Questions";
import Timer from "../components/Timer";
import Score from "../components/Score";

import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(
    window.localStorage.getItem("previousScore") || 0
  );

  const [user] = useAuthState(auth);

  const startQuiz = () => {
    console.log("Start Quiz");
    setScore(0); // Reset score
    setQuizStarted(true); // Start the quiz
  };

  const stopQuiz = () => {
    console.log("Stop Quiz");
    window.localStorage.setItem("previousScore", score); // Save to local storage
    setQuizStarted(false); // End the quiz and show the button again
  };

  const handleScoreChange = (newScore) => {
    setScore(newScore);
  };

  const submitScore = async () => {

    try {
      const docRef = await addDoc(collection(db, "scores"), {
        score: Number(score),
        createdAt: serverTimestamp(),
        user: user.displayName,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }; 

  return (
    <>
      {quizStarted ? (
        <div>
          <Timer onTimeUp={stopQuiz} />
          <Questions onScoreChange={handleScoreChange} />
          <Score score={score} />
          <button onClick={stopQuiz}>Stop Quiz</button>
        </div>
      ) : (
        <>
          <button onClick={startQuiz}>Start Quiz</button>
          {Score !== null && <p> Previous Score: {score}</p>}
          {user && <button onClick={submitScore}>Submit Score</button>}
        </>
      )}
    </>
  );
};

export default Quiz;
