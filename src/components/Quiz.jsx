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
        <div className="flex flex-col items-center space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <Timer onTimeUp={stopQuiz} />
          <Questions onScoreChange={handleScoreChange} />
          <Score score={score} />
          <button
            onClick={stopQuiz}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Stop Quiz
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4 bg-gray-100 p-6 rounded-lg shadow-lg">
          <button
            onClick={startQuiz}
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition"
          >
            Start Quiz
          </button>
          {score !== null && (
            <p className="text-lg font-semibold text-gray-700">
              Previous Score: {score}
            </p>
          )}
          {user && (
            <button
              onClick={submitScore}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition"
            >
              Submit Score
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Quiz;
