// src/pages/HomePage.js
import Quiz from "../components/Quiz";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";

//import { auth } from "../firebase/firebase";
//import { useAuthState } from "react-firebase-hooks/auth";



const HomePage = () => {
  //const [user] = useAuthState(auth);

  return (
    <>
      <Navbar />
      <section><Quiz /></section>
      <Leaderboard />
    </>
  );

};

export default HomePage;
