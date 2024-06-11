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
    action.navigate('/home')
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message)
    } else {
      alert('An unknown error occurred')
    }
  }
}

export function* authenticatedLoginGoogleSaga(
  action: ReturnType<typeof createGoogleLogin>
) {
  try {
    const result: unknown = yield call(FireBaseAuthService.loginWithGoogle)
    yield put(createLoginSuccess(result))
    action.navigate('/home')
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message)
    } else {
      alert('An unknown error occurred')
    }
  }
}

export function* logOutSaga() {
  try {
    yield call(FireBaseAuthService.logOutUser)
    yield put(clearLoginSuccess())
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message)
    } else {
      alert('An unknown error occurred')
    }
  }
}
