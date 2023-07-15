import { call, put } from 'redux-saga/effects'
import firebaseFirestoreService from '../../FireBaseFirestoreService'
import { fetchRecipeList, fetchRecipeListSuccess } from '../reducer/recipeList'
export function* fetchRecipeListSaga(
  action: ReturnType<typeof fetchRecipeList>
) {
  try {
    const result: unknown = yield call(
      firebaseFirestoreService.readDocument,
      'recipes',
      action.queries,
      action.field,
      action.order
    )
    yield put(fetchRecipeListSuccess(result))
  } catch (error) {
    alert(error)
  }
}
