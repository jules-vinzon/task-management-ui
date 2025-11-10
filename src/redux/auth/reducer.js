import actions from "./actions";

const initialState = {
  idToken: null,
  loginErrorMessage: null,
  loginSuccess: false,
  isLoggingIn: false,
  loginData: null,
  signupSuccess: false,
  isSigningUp: false,
  signupErrorMessage: null,
  status: "idle",
  kickedOut: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actions.LOGGING_IN:
      return {
        ...state,
        isLoggingIn: true,
      };
    case actions.LOG_IN_SUCCESS:
      return {
        ...state,
        idToken: action.token,
        pubKey: action.pubKey,
        loginSuccess: action.loginSuccess,
        isLoggingIn: false,
        loginData: action.loginData,
        modules: action.loginData.role_details,
        status: "success",
      };
    case actions.LOG_IN_FAILED:
      return {
        ...state,
        loginErrorMessage: action.error,
        loginSuccess: action.loginSuccess,
        isLoggingIn: false,
        status: "failed",
      };
    case actions.LOG_IN_ERROR:
      return {
        ...state,
        kickedOut: false,
        loginErrorMessage: action.error,
        loginSuccess: action.loginSuccess,
        isLoggingIn: false,
      };

    case actions.SIGNING_UP:
      return {
        ...state,
        isSigningUp: true,
      };
    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        signupSuccess: true,
        isSigningUp: false,
      };
    case actions.SIGN_UP_FAILED:
      return {
        ...state,
        signupErrorMessage: action.error,
        signupSuccess: false,
        isSigningUp: false,
      };
    case actions.LOG_OUT_SUCCESS:
      return {
        ...state,
        kickedOut: true,
        loginSuccess: false,
        loginErrorMessage: null,
        loginData: null
      };
    default:
      return state;
  }
}
