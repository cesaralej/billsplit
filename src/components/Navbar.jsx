import { auth } from "../firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button
      className="bg-white text-indigo-700 font-semibold py-2 px-4 rounded hover:bg-indigo-100 transition-colors duration-200"
      onClick={signInWithGoogle}
    >
      Sign in with Google
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition-colors duration-200"
        onClick={() => auth.signOut()}
      >
        Sign Out
      </button>
    )
  );
}

const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <nav className="bg-indigo-700 border-b border-indigo-500 flex justify-between items-center p-4">
      <h1 className="text-xl text-white font-bold">BillSplit Battle</h1>
      <div className="flex items-center space-x-4">
        {user ? (
          <p className="text-white">Welcome, {user.displayName}</p>
        ) : (
          <SignIn />
        )}
        <SignOut />
      </div>
    </nav>
  );
};

export default Navbar;
