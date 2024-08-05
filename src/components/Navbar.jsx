import { auth } from "../firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <nav>
      <h1>BillSplit Battle</h1>
      {user ? <p>Welcome, {user.displayName}</p> : <SignIn />}
      <SignOut />
    </nav>
  );
};

export default Navbar;
