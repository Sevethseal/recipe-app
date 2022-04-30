import firebase from "./FirebaseConfig";

const fireStore = firebase.firestore();

const createDocument = (collection, document) => {
  return fireStore.collection(collection).add(document);
};
const readDocument = (collection) => {
  return fireStore.collection(collection).get();
};
const readUniqueDocument = (collection, id) => {
  return fireStore.collection(collection).doc(id).get();
};
const updateDocument = (collection, id, document) => {
  return fireStore.collection(collection).doc(id).update(document);
};
const deleteDocument = (collection, id) => {
  return fireStore.collection(collection).doc(id).delete();
};

const firebaseFirestoreService = {
  createDocument,
  readDocument,
  readUniqueDocument,
  updateDocument,
  deleteDocument,
};

export default firebaseFirestoreService;
