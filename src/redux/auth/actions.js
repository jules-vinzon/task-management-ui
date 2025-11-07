const actions = {
  // LOG IN
  LOG_IN: "LOG_IN",
  LOGGING_IN: "LOGGING_IN",
  LOG_IN_SUCCESS: "LOG_IN_SUCCESS",
  LOG_IN_FAILED: "LOG_IN_FAILED",
  LOG_IN_ERROR: "LOG_IN_ERROR",

  // SIGN UP
  SIGN_UP: "SIGN_UP",
  SIGNING_UP: "SIGNING_UP",
  SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
  SIGN_UP_FAILED: "SIGN_UP_FAILED",

  // REFETCH AUTH
  REFETCH_AUTH: "REFETCH_AUTH",
  REFETCHING_AUTH: "REFETCHING_AUTH",
  REFETCH_AUTH_SUCCESS: "REFETCH_AUTH_SUCCESS",
  REFETCH_AUTH_FAILED: "REFETCH_AUTH_FAILED",

  //LOG OUT
  LOG_OUT: "LOG_OUT",
  LOGGING_OUT: "LOGGING_OUT",
  LOG_OUT_SUCCESS: "LOG_OUT_SUCCESS",
  LOG_OUT_FAILED: "LOG_OUT_FAILED",
  LOG_OUT_ERROR: "LOG_OUT_ERROR",

  logout: (payload) => ({
    type: actions.LOG_OUT,
    payload: payload,
  }),

  login: (payload) => ({
    type: actions.LOG_IN,
    payload,
  }),

  signup: (payload) => ({
    type: actions.SIGN_UP,
    payload,
  }),

  refetchAuth: () => ({
    type: actions.REFETCH_AUTH,
  }),
};

export default actions;
