import { call, put } from "redux-saga/effects";
import firebaseFirestoreService from "../../FireBaseFirestoreService";
import { fetchRecipeListSuccess } from "../reducer/recipeList";
export function* fetchRecipeListSaga(action) {
  try {
    console.log(action);
    const result = yield call(
      firebaseFirestoreService.readDocument,
      "recipes",
      action.queries,
      action.field,
      action.order
    );
    yield put(fetchRecipeListSuccess(result));
  } catch (error) {
    console.log(error);
  }
}
