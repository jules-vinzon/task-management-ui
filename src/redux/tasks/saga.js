import { all, takeEvery, fork, put, select } from "redux-saga/effects";

import { get, post, PUT, fetchWithForbidden } from "utils/apiRequestor";
import actions from "./actions";

function getHeaders() {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    token: localStorage.getItem("idToken"),
  };
}


export function* fetchTasks() {
  yield takeEvery("FETCH_TASKS", function* ({ payload }) {
    try {
      console.log("[FETCH_TASKS][SAGA]: CHECK PAYLOAD", payload);

      yield put({
        type: actions.FETCHING_TASKS,
        fetchingParams: payload,
      });

      const apiResponse = yield fetchTasksApi(payload);
      console.log("[FETCH_TASKS][SAGA]: CHECK RESPONSE", apiResponse);

      if (apiResponse.status >= 200 && apiResponse.status < 300) {
        yield put({
          type: actions.FETCH_TASKS_SUCCESS,
          tasksData: apiResponse.data,
        });
      } else if (apiResponse.status === 401) {
        yield put({
          type: actions.FETCH_TASKS_FAILURE,
          loginSuccess: false,
          tokenError: "Invalid credentials",
        });
      } else {
        yield put({
          type: actions.FETCH_TASKS_FAILURE,
          error: apiResponse.data.error,
        });
      }
    } catch (e) {
      console.log("[FETCH_TASKSN][SAGA]: INTERNAL ERROR", e);
      yield put({
        type: actions.FETCH_TASKS_FAILURE,
        loginSuccess: false,
        error: "There was an internal error. Please try again later.",
      });
    }
  });
}

export function* addTasks() {
  yield takeEvery("ADD_TASK", function* ({ payload }) {
    try {
      console.log("[ADD_TASK][SAGA]: CHECK PAYLOAD", payload);

      yield put({
        type: actions.ADDING_TASK,
      });

      const apiResponse = yield addTasksApi(payload);
      console.log(" ", apiResponse);

      const state = yield select();

      const fetchingParams = state.Tasks.fetchingParams;

      console.log(
        "[ADD_TASK][SAGA]: FETCHING PARAMS FROM STATE",
        fetchingParams
      );

      if (apiResponse.status >= 200 && apiResponse.status < 300) {
        yield put({
          type: actions.ADD_TASK_SUCCESS,
        });
        yield put({
          type: actions.FETCH_TASKS,
          payload: fetchingParams,
        });
      } else if (apiResponse.status === 401) {
        yield put({
          type: actions.ADD_TASK_FAILURE,
          tokenError: "Invalid credentials",
        });
      } else {
        yield put({
          type: actions.ADD_TASK_FAILURE,
          error: "Failed to add task.",
        });
      }
    } catch (e) {
      console.log("[ADD_TASK][SAGA]: INTERNAL ERROR", e);
      yield put({
        type: actions.ADD_TASK_FAILURE,
        loginSuccess: false,
        error: "There was an internal error. Please try again later.",
      });
    }
  });
}

export function* deleteTasks() {
  yield takeEvery("DELETE_TASK", function* ({ payload }) {
    try {
      console.log("[DELETE_TASK][SAGA]: CHECK PAYLOAD", payload);

      yield put({
        type: actions.ADDING_TASK,
      });

      const apiResponse = yield deleteTasksApi(payload);
      console.log("[DELETE_TASK][SAGA]: CHECK RESPONSE", apiResponse);

      const state = yield select();

      const fetchingParams = state.Tasks.fetchingParams;

      console.log(
        "[DELETE_TASK][SAGA]: FETCHING PARAMS FROM STATE",
        fetchingParams
      );

      if (apiResponse.status >= 200 && apiResponse.status < 300) {
        yield put({
          type: actions.DELETE_TASK_SUCCESS,
        });
        yield put({
          type: actions.FETCH_TASKS,
          payload: fetchingParams,
        });
      } else if (apiResponse.status === 401) {
        yield put({
          type: actions.DELETE_TASK_FAILURE,
          tokenError: "Invalid credentials",
        });
      } else {
        yield put({
          type: actions.DELETE_TASK_FAILURE,
          error: "Failed to delete task/s.",
        });
      }
    } catch (e) {
      console.log("[DELETE_TASK][SAGA]: INTERNAL ERROR", e);
      yield put({
        type: actions.DELETE_TASK_FAILURE,
        loginSuccess: false,
        error: "There was an internal error. Please try again later.",
      });
    }
  });
}

export function* updateTask() {
  yield takeEvery("UPDATE_TASK", function* ({ payload }) {
    try {
      console.log("[UPDATE_TASK][SAGA]: CHECK PAYLOAD", payload);

      yield put({
        type: actions.UPDATING_TASK,
      });

      const apiResponse = yield updateTaskApi(payload);
      console.log("[UPDATE_TASK][SAGA]: CHECK RESPONSE", apiResponse);

      const state = yield select();

      const fetchingParams = state.Tasks.fetchingParams;

      console.log(
        "[UPDATE_TASK][SAGA]: FETCHING PARAMS FROM STATE",
        fetchingParams
      );

      if (apiResponse.status >= 200 && apiResponse.status < 300) {
        yield put({
          type: actions.UPDATE_TASK_SUCCESS,
        });
        yield put({
          type: actions.FETCH_TASKS,
          payload: fetchingParams,
        });
      } else if (apiResponse.status === 401) {
        yield put({
          type: actions.UPDATE_TASK_FAILURE,
          tokenError: "Invalid credentials",
        });
      } else {
        yield put({
          type: actions.UPDATE_TASK_FAILURE,
          error: "Failed to update task.",
        });
      }
    } catch (e) {
      console.log("[UPDATE_TASK][SAGA]: INTERNAL ERROR", e);
      yield put({
        type: actions.UPDATE_TASK_FAILURE,
        error: "There was an internal error. Please try again later.",
      });
    }
  });
}

function fetchTasksApi(payload) {
  return fetchWithForbidden(`tasks/${payload.user_id}`, {
    headers: getHeaders(),
    method: "GET",
  });
}

function addTasksApi(payload) {
  return fetchWithForbidden(`tasks/`, {
    headers: getHeaders(),
    method: "POST",
    data: payload,
  });
}

function deleteTasksApi(payload) {
  return fetchWithForbidden(`tasks/delete`, {
    headers: getHeaders(),
    method: "POST",
    data: payload,
  });
}

function updateTaskApi(payload) {
  return fetchWithForbidden(`tasks/${payload.task_id}`, {
    headers: getHeaders(),
    method: "PUT",
    data: payload,
  });
}

export default function* rootSaga() {
  yield all([
    fork(fetchTasks),
    fork(addTasks),
    fork(deleteTasks),
    fork(updateTask),
  ]);
}
