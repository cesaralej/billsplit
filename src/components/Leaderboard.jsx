import { db } from "../firebase/firebase";
import { collection } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore"; 
import { useCollectionData } from "react-firebase-hooks/firestore";


const Leaderboard = () => {

  const leaderboardRef = collection(db, "scores");
  const q = query(leaderboardRef, limit(10), orderBy("score", "desc"));
  const [scores] = useCollectionData(q, { idField: "id" });

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol>
        {scores &&
          scores.map((score) => (
            <li key={score.id}>
              {score.user} - {score.score}
            </li>
          ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
