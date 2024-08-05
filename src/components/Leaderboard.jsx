import { db } from "../firebase/firebase";
import { collection } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore"; 
import { useCollectionData } from "react-firebase-hooks/firestore";


const Leaderboard = () => {

  const leaderboardRef = collection(db, "scores");
  const q = query(leaderboardRef, limit(5), orderBy("score", "desc"));
  const [scores] = useCollectionData(q, { idField: "id" });

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        Leaderboard
      </h2>
      <p className="text-gray-600 mb-6">
        See if you can beat your friends to the top!
      </p>
      <ol className="list-decimal list-inside space-y-2 text-lg text-gray-800">
        {scores &&
          scores.map((score) => (
            <li key={score.id} className="font-medium">
              {score.user} -{" "}
              <span className="text-indigo-500">{score.score}</span>
            </li>
          ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
