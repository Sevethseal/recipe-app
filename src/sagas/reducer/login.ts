import { NavigateFunction } from 'react-router-dom'
import { AnyAction } from 'redux'
import { InitialLoginState } from './types'

export const CREATE_LOGIN_ACTION = 'CREATE_LOGIN_ACTION'
export const CREATE_LOGIN_SUCCESS_ACTION = 'CREATE_LOGIN_SUCCESS_ACTION'
export const CLEAR_LOGIN_ACTION = 'CLEAR_LOGIN_ACTION'
export const CREATE_GOOGLE_LOGIN_ACTION = 'CREATE_GOOGLE_LOGIN_ACTION'
export const CLEAR_LOGIN_SUCCESS_ACTION = 'CLEAR_LOGIN_SUCCESS_ACTION'

export const createLogin = (
  email: string,
  password: string,
  navigate: NavigateFunction
) => ({
  type: CREATE_LOGIN_ACTION,
  email,
  password,
  navigate,
})
export const createGoogleLogin = (navigate: NavigateFunction) => ({
  type: CREATE_GOOGLE_LOGIN_ACTION,
  navigate,
})

export const createLoginSuccess = (currentUser: unknown) => ({
  type: CREATE_LOGIN_SUCCESS_ACTION,
  currentUser,
})
export const clearLogin = () => ({
  type: CLEAR_LOGIN_ACTION,
})
export const clearLoginSuccess = () => ({
  type: CLEAR_LOGIN_SUCCESS_ACTION,
})

const initialLoginState: InitialLoginState = {
  currentUser: null,
}
const loginReducer = (state = initialLoginState, action: AnyAction) => {
  switch (action.type) {
    case CREATE_LOGIN_SUCCESS_ACTION: {
      const { currentUser } = action
      return {
        ...state,
        currentUser,
      }
    }
    case CLEAR_LOGIN_SUCCESS_ACTION: {
      return initialLoginState
    }
    default:
      return state
  }
}

export default loginReducer
