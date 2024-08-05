// src/pages/HomePage.js
import Quiz from "../components/Quiz";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";

const HomePage = () => {

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">
          Welcome to BillSplit!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Think you&apos;re quick at splitting the bill with friends? Test your
          skills by calculating how much each person should pay when the bill is
          split evenly. How many can you get in a minute?
        </p>
        <section className="bg-white shadow-md rounded-lg p-6">
          <Quiz />
        </section>
        <div className="mt-10">
          <Leaderboard />
        </div>
      </div>
    </>
  );

};

export default HomePage;
