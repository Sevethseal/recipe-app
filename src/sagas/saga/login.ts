import { call, put } from 'redux-saga/effects'
import FireBaseAuthService from '../../FireBaseAuthService'
import {
  createLoginSuccess,
  clearLoginSuccess,
  createLogin,
  createGoogleLogin,
} from '../reducer/login'

export function* authenticatedLoginSaga(
  action: ReturnType<typeof createLogin>
) {
  try {
    const { email, password } = action
    const result: unknown = yield call(
      FireBaseAuthService.login,
      email,
      password
    )
    yield put(createLoginSuccess(result))
    action.navigate('/about')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message)
  }
}

export function* authenticatedLoginGoogleSaga(
  action: ReturnType<typeof createGoogleLogin>
) {
  try {
    const result: unknown = yield call(FireBaseAuthService.loginWithGoogle)
    yield put(createLoginSuccess(result))
    action.navigate('/about')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message)
  }
}

export function* logOutSaga() {
  try {
    yield call(FireBaseAuthService.logOutUser)
    yield put(clearLoginSuccess())
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.message)
  }
}
