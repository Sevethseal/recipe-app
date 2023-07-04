import { takeLatest } from "redux-saga/effects";
import {
  CREATE_LOGIN_ACTION,
  CREATE_GOOGLE_LOGIN_ACTION,
  CLEAR_LOGIN_ACTION,
} from "../reducer/login";
import {
  FETCH_RECIPE_ACTION,
  CREATE_RECIPE_ACTION,
  UPDATE_RECIPE_ACTION,
  DELETE_RECIPE_ACTION,
} from "../reducer/recipe";
import { FETCH_RECIPE_LIST_ACTION } from "../reducer/recipeList";
import {
  authenticatedLoginSaga,
  authenticatedLoginGoogleSaga,
  logOutSaga,
} from "../saga/login";
import {
  fetchRecipeSaga,
  createRecipeSaga,
  updateRecipeSaga,
  deleteRecipeSaga,
} from "../saga/recipe";
import { fetchRecipeListSaga } from "../saga/recipeList";

function* mySaga() {
  yield takeLatest(CREATE_LOGIN_ACTION, authenticatedLoginSaga);
  yield takeLatest(CREATE_GOOGLE_LOGIN_ACTION, authenticatedLoginGoogleSaga);
  yield takeLatest(CLEAR_LOGIN_ACTION, logOutSaga);
  yield takeLatest(FETCH_RECIPE_ACTION, fetchRecipeSaga);
  yield takeLatest(CREATE_RECIPE_ACTION, createRecipeSaga);
  yield takeLatest(UPDATE_RECIPE_ACTION, updateRecipeSaga);
  yield takeLatest(DELETE_RECIPE_ACTION, deleteRecipeSaga);
  yield takeLatest(FETCH_RECIPE_LIST_ACTION, fetchRecipeListSaga);
}

export default mySaga;
