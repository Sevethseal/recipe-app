import firebase from "./FirebaseConfig";

const fireStore = firebase.firestore();

const createDocument = (collection, document) => {
  return fireStore.collection(collection).add(document);
};
const readDocument = (collection, queries = [], field = "", order = "") => {
  let collectionRef = fireStore.collection(collection);
  if (queries.length > 0) {
    for (const query of queries) {
      collectionRef = collectionRef.where(
        query.field,
        query.condition,
        query.value
      );
    }
  }
  if (field && order) {
    collectionRef = collectionRef.orderBy(field, order);
  }
  return collectionRef.get();
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
const queryHandler = (collection, queries) => {
  return fireStore
    .collection(collection)
    .where(queries.field, queries.condition, queries.value)
    .get();
};

const firebaseFirestoreService = {
  createDocument,
  readDocument,
  readUniqueDocument,
  updateDocument,
  deleteDocument,
  queryHandler,
};

export default firebaseFirestoreService;
