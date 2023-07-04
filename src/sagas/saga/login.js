import { call, put } from "redux-saga/effects";
import FireBaseAuthService from "../../FireBaseAuthService";
import { createLoginSuccess, clearLoginSuccess } from "../reducer/login";
export function* authenticatedLoginSaga(action) {
  try {
    const { email, password } = action;
    const result = yield call(FireBaseAuthService.login, email, password);
    yield put(createLoginSuccess(result));
    action.navigate("/home");
  } catch (error) {
    alert(error.message);
  }
}

export function* authenticatedLoginGoogleSaga(action) {
  try {
    const result = yield call(FireBaseAuthService.loginWithGoogle);
    yield put(createLoginSuccess(result));
    action.navigate("/home");
  } catch (error) {
    alert(error.message);
  }
}

export function* logOutSaga() {
  try {
    yield call(FireBaseAuthService.logOutUser);
    yield put(clearLoginSuccess());
  } catch (error) {
    alert(error.message);
  }
}
