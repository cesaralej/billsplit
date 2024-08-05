// src/pages/HomePage.js
import Quiz from "../components/Quiz";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";

const HomePage = () => {

  return (
    <>
      <Navbar />
      <section><Quiz /></section>
      <Leaderboard />
    </>
  );

};

export default HomePage;
