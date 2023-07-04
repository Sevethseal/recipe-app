export const CREATE_LOGIN_ACTION = "CREATE_LOGIN_ACTION";
export const CREATE_LOGIN_SUCCESS_ACTION = "CREATE_LOGIN_SUCCESS_ACTION";
export const CLEAR_LOGIN_ACTION = "CLEAR_LOGIN_ACTION";
export const CREATE_GOOGLE_LOGIN_ACTION = "CREATE_GOOGLE_LOGIN_ACTION";
export const CLEAR_LOGIN_SUCCESS_ACTION = "CLEAR_LOGIN_SUCCESS_ACTION";

export const createLogin = (email, password, navigate) => ({
  type: CREATE_LOGIN_ACTION,
  email,
  password,
  navigate,
});
export const createGoogleLogin = (navigate) => ({
  type: CREATE_GOOGLE_LOGIN_ACTION,
  navigate,
});

export const createLoginSuccess = (currentUser) => ({
  type: CREATE_LOGIN_SUCCESS_ACTION,
  currentUser,
});
export const clearLogin = () => ({
  type: CLEAR_LOGIN_ACTION,
});
export const clearLoginSuccess = () => ({
  type: CLEAR_LOGIN_SUCCESS_ACTION,
});

const initialLoginState = {
  currentUser: null,
};
const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case CREATE_LOGIN_SUCCESS_ACTION: {
      const { currentUser } = action;
      return {
        ...state,
        currentUser,
      };
    }
    case CLEAR_LOGIN_SUCCESS_ACTION: {
      return initialLoginState;
    }
    default:
      return state;
  }
};

export default loginReducer;
