import { call, put } from 'redux-saga/effects'
import firebaseFirestoreService from '../../FireBaseFirestoreService'
import { fetchRecipeList, fetchRecipeListSuccess } from '../reducer/recipeList'
import { setLoadingFalse, setLoadingTrue } from '../reducer/login'
import { RecipeListResponse } from '../reducer/types'
export function* fetchRecipeListSaga(
  action: ReturnType<typeof fetchRecipeList>
) {
  try {
    yield put(setLoadingTrue())
    const result: RecipeListResponse = yield call(
      firebaseFirestoreService.readDocument,
      'recipes',
      action.queries,
      action.field,
      action.order
    )
    yield put(fetchRecipeListSuccess(result))
    yield put(setLoadingFalse())
  } catch (error) {
    alert(error)
    yield put(setLoadingFalse())
  }
}
