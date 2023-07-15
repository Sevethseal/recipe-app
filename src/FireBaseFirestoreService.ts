/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from './FirebaseConfig'

const fireStore = firebase.firestore()

const createDocument = (collection: string, document: any) => {
  return fireStore.collection(collection).add(document)
}
const readDocument = (
  collection: string,
  queries: any[] = [],
  field = '',
  order: any
) => {
  let collectionRef = fireStore.collection(collection)
  if (queries.length > 0) {
    for (const query of queries) {
      collectionRef = collectionRef.where(
        query.field,
        query.condition,
        query.value
      ) as any
    }
  }
  if (field && order) {
    collectionRef = collectionRef.orderBy(field, order) as any
  }
  return collectionRef.get()
}
const readUniqueDocument = (collection: string, id: string) => {
  return fireStore.collection(collection).doc(id).get()
}
const updateDocument = (collection: string, id: string, document: any) => {
  return fireStore.collection(collection).doc(id).update(document)
}
const deleteDocument = (collection: string, id: any) => {
  return fireStore.collection(collection).doc(id).delete()
}
const queryHandler = (collection: string, queries: any) => {
  return fireStore
    .collection(collection)
    .where(queries.field, queries.condition, queries.value)
    .get()
}

const firebaseFirestoreService = {
  createDocument,
  readDocument,
  readUniqueDocument,
  updateDocument,
  deleteDocument,
  queryHandler,
}

export default firebaseFirestoreService
