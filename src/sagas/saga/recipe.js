import { call, put } from "redux-saga/effects";
import firebaseFirestoreService from "../../FireBaseFirestoreService";
import { fetchRecipeSuccess } from "../reducer/recipe";
export function* fetchRecipeSaga(action) {
  try {
    console.log(action);
    const result = yield call(
      firebaseFirestoreService.readUniqueDocument,
      "recipes",
      action.id
    );
    yield put(fetchRecipeSuccess(result));
  } catch (error) {
    console.log(error);
  }
}

export function* createRecipeSaga(action) {
  try {
    yield call(
      firebaseFirestoreService.createDocument,
      "recipes",
      action.recipe
    );
  } catch (error) {
    console.log(error);
  }
}

export function* updateRecipeSaga(action) {
  try {
    yield call(
      firebaseFirestoreService.updateDocument,
      "recipes",
      action.id,
      action.recipe
    );
  } catch (error) {
    console.log(error);
  }
}

export function* deleteRecipeSaga(action) {
  try {
    console.log(action);
    yield call(firebaseFirestoreService.deleteDocument, "recipes", action.id);
  } catch (error) {
    console.log(error);
  }
}
