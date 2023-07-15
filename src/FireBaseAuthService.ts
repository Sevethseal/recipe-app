import firebase from './FirebaseConfig'
const auth = firebase.auth()

const registerUser = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password)
}
const login = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password)
}
const logOutUser = () => {
  return auth.signOut()
}

const sendPasswordResetEmail = (email: string) => {
  return auth.sendPasswordResetEmail(email)
}
const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  return auth.signInWithPopup(provider)
}

const subscribeToAuthChanges = (
  handleAuthChanges: React.Dispatch<React.SetStateAction<null | boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<null | boolean>>
) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      handleAuthChanges(true)
    } else {
      handleAuthChanges(false)
    }
    setLoading(false)
  })
}

const FireBaseAuthService = {
  registerUser,
  login,
  logOutUser,
  sendPasswordResetEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
}

export default FireBaseAuthService
