import { all, takeEvery, fork, put, call } from "redux-saga/effects";

import { post, fetchWithForbidden } from "utils/apiRequestor";
import { encryptRequest } from "utils/encryptor.js";
import actions from "./actions";

let headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export function* login() {
  yield takeEvery("LOG_IN", function* ({ payload }) {
    try {
      console.log("[LOG_IN][SAGA]: CHECK PAYLOAD", payload);

      yield put({
        type: actions.LOGGING_IN,
      });

      const requestId = payload.request_id;

      const getPublicKeyData = {
        request_id: requestId,
      };

      const publicKeyResponse = yield getPublicKey(getPublicKeyData);
      const publicKeyData = yield publicKeyResponse.json();
      console.log(
        "[LOG_IN][SAGA]: CHECK GET PUBLIC KEY RESPONSE",
        publicKeyData
      );

      if (publicKeyData.success) {
        const publicKey = publicKeyData.public_key;

        delete payload.request_id;
        const encryptedData = encryptRequest(payload, publicKey);
        console.log("[LOG_IN][SAGA]: CHECK ENCRYPTED DATA", encryptedData);

        const newLoginData = {
          request_id: requestId,
          encdata: encryptedData,
        };
        console.log("[LOG_IN][SAGA]: CHECK NEW LOGIN DATA", newLoginData);

        const loginResponse = yield loginRequest(newLoginData);
        const loginData = yield loginResponse.json();
        console.log("[LOG_IN][SAGA]: CHECK LOGIN RESPONSE", loginData);

        if (loginData.success) {
          yield put({
            type: actions.LOG_IN_SUCCESS,
            token: loginData.token,
            pubKey: publicKey,
            loginSuccess: true,
            loginData: loginData,
          });
        } else {
          yield put({
            type: actions.LOG_IN_FAILED,
            loginSuccess: false,
            error: loginData.error,
          });
        }
      }
    } catch (e) {
      console.log("[LOG_IN][SAGA]: INTERNAL ERROR", e);
      yield put({
        type: actions.LOG_IN_ERROR,
        error: "Login Error",
        loginSuccess: false,
      });
    }
  });
}

export function* signup() {
  yield takeEvery("SIGN_UP", function* ({ payload }) {
    try {
      console.log("[SIGN_UP][SAGA]: CHECK PAYLOAD", payload);

      yield put({
        type: actions.SIGNING_UP,
      });

      const requestId = payload.request_id;

      const getPublicKeyData = {
        request_id: requestId,
      };

      const publicKeyResponse = yield getPublicKey(getPublicKeyData);
      const publicKeyData = yield publicKeyResponse.json();
      console.log(
        "[SIGN_UP][SAGA]: CHECK GET PUBLIC KEY RESPONSE",
        publicKeyData
      );

      if (publicKeyData.success) {
        const publicKey = publicKeyData.public_key;

        delete payload.request_id;
        const encryptedData = encryptRequest(payload, publicKey);
        console.log("[SIGN_UP][SAGA]: CHECK ENCRYPTED DATA", encryptedData);

        const newLoginData = {
          request_id: requestId,
          encdata: encryptedData,
        };
        console.log("[SIGN_UP][SAGA]: CHECK NEW LOGIN DATA", newLoginData);

        const loginResponse = yield signupRequest(newLoginData);
        const loginData = yield loginResponse.json();
        console.log("[SIGN_UP][SAGA]: CHECK LOGIN RESPONSE", loginData);

        if (loginData.success) {
          yield put({
            type: actions.SIGN_UP_SUCCESS,
          });
        } else {
          yield put({
            type: actions.SIGN_UP_FAILED,
            error: loginData.error,
          });
        }
      }
    } catch (e) {
      console.log("[SIGN_UP][SAGA]: INTERNAL ERROR", e);
      yield put({
        type: actions.SIGN_UP_FAILED,
        error: "Login Error",
        loginSuccess: false,
      });
    }
  });
}

export function* refetchAuth() {
  yield takeEvery("REFETCH_AUTH", function* ({ payload }) {
    try {
      console.log("[REFETCH_AUTH][SAGA]: CHECK PAYLOAD", payload);

      yield put({
        type: actions.REFETCHING_AUTH,
      });

      const apiResponse = yield refetchAuthApi();
      console.log("[REFETCH_AUTH][SAGA]: CHECK API RESPONSE", apiResponse);

      const apiData = apiResponse.data;
      console.log("[REFETCH_AUTH][SAGA]: CHECK API DATA", apiData);

      if (apiResponse.status >= 200 && apiResponse.status < 300) {
        console.log("[REFETCH_AUTH][SAGA]: REFETCH AUTH SUCCESS");
        yield put({
          type: actions.LOG_IN_SUCCESS,
          token: apiData.token,
          loginSuccess: true,
          loginData: apiData,
        });
      } else {
        yield put({
          type: actions.LOG_IN_FAILED,
          loginSuccess: false,
        });
      }
    } catch (e) {
      console.log("[LOG_IN][SAGA]: INTERNAL ERROR", e);
      yield put({
        type: actions.LOG_IN_ERROR,
        error: "Login Error",
        loginSuccess: false,
      });
    }
  });
}

export function* logout() {
  yield takeEvery(actions.LOG_OUT, function* ({ payload }) {
    console.log("[LOG_OUT][SAGA]: CHECK PAYLOAD", payload);

    yield localStorage.removeItem("idToken");

    yield call(logoutApi, payload);
    yield put({
      type: actions.LOG_OUT_SUCCESS,
    });
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOG_IN_SUCCESS, function* (payload) {
    yield localStorage.setItem("idToken", payload.token);
    yield localStorage.setItem("pubKey", payload.pubKey);
  });
}

function refetchAuthApi() {
  return fetchWithForbidden(`auth/refetch`, {
    headers: {
      ...headers,
      token: localStorage.getItem("idToken"),
    },
    method: "GET",
  });
}

function getPublicKey(payload) {
  return post(`auth/get-key`, payload);
}

function loginRequest(payload) {
  return post(`auth/login`, payload);
}

function signupRequest(payload) {
  return post(`auth/register`, payload);
}

function logoutApi(payload) {
  return post(`auth/logout`, payload);
}

export default function* rootSaga() {
  yield all([
    fork(login),
    fork(signup),
    fork(loginSuccess),
    fork(refetchAuth),
    fork(logout),
  ]);
}
