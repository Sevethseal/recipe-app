import { call, put } from 'redux-saga/effects'
import firebaseFirestoreService from '../../FireBaseFirestoreService'
import {
  createRecipe,
  deleteRecipe,
  fetchRecipe,
  fetchRecipeSuccess,
  updateRecipe,
} from '../reducer/recipe'
import { setLoadingFalse, setLoadingTrue } from '../reducer/login'
export function* fetchRecipeSaga(action: ReturnType<typeof fetchRecipe>) {
  try {
    yield put(setLoadingTrue())
    const result: unknown = yield call(
      firebaseFirestoreService.readUniqueDocument,
      'recipes',
      action.id
    )
    yield put(fetchRecipeSuccess(result))
    yield put(setLoadingFalse())
  } catch (error) {
    yield put(setLoadingFalse())
    alert(error)
  }
}

export function* createRecipeSaga(action: ReturnType<typeof createRecipe>) {
  try {
    yield call(
      firebaseFirestoreService.createDocument,
      'recipes',
      action.recipe
    )
  } catch (error) {
    alert(error)
  }
}

export function* updateRecipeSaga(action: ReturnType<typeof updateRecipe>) {
  try {
    yield call(
      firebaseFirestoreService.updateDocument,
      'recipes',
      action.id,
      action.recipe
    )
  } catch (error) {
    alert(error)
  }
}

export function* deleteRecipeSaga(action: ReturnType<typeof deleteRecipe>) {
  try {
    yield call(firebaseFirestoreService.deleteDocument, 'recipes', action.id)
  } catch (error) {
    alert(error)
  }
}
