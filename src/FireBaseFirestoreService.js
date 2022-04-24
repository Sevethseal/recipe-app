import firebase from "./FirebaseConfig";

const firestore = firebase.firestore();

const createDocument = (collection, document) => {
  return firestore.collection(collection).add(document);
};
const readDocument = (collection) => {
  return firestore.collection(collection).get();
};
const readUniqueDocument = (collection, id) => {
  return firestore.collection(collection).doc(id).get();
};

const firebaseFirestoreService = {
  createDocument,
  readDocument,
  readUniqueDocument,
};

export default firebaseFirestoreService;
