import firebase from "./FirebaseConfig";
const auth = firebase.auth();

const registerUser = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};
const login = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};
const logOutUser = () => {
  return auth.signOut();
};

const sendPasswordResetEmail = (email) => {
  return auth.sendPasswordResetEmail();
};
const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

const subscribeToAuthChanges = (handleAuthChanges) => {
  auth.onAuthStateChanged((user) => {
    handleAuthChanges(user);
  });
};

const FireBaseAuthService = {
  registerUser,
  login,
  logOutUser,
  sendPasswordResetEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
};

export default FireBaseAuthService;
