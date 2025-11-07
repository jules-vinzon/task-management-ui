import { all, takeEvery, fork, put, select } from "redux-saga/effects";

import { get, post, PUT } from "utils/apiRequestor";
import actions from "./actions";

export function* fetchTasks() {
  yield takeEvery("FETCH_TASKS", function* ({ payload }) {
    try {
      console.log("[FETCH_TASKS][SAGA]: CHECK PAYLOAD", payload);

      yield put({
        type: actions.FETCHING_TASKS,
        fetchingParams: payload,
      });

      const apiResponse = yield fetchTasksApi(payload);
      const resData = yield apiResponse.json();
      console.log("[FETCH_TASKS][SAGA]: CHECK RESPONSE", resData);

      if (apiResponse.status >= 200 && apiResponse.status < 300) {
        yield put({
          type: actions.FETCH_TASKS_SUCCESS,
          tasksData: resData,
        });
      } else {
        yield put({
          type: actions.FETCH_TASKS_FAILURE,
          loginSuccess: false,
          error: resData.error,
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
      console.log("[ADD_TASK][SAGA]: CHECK RESPONSE", apiResponse);

      const resData = yield apiResponse.json();
      console.log("[ADD_TASK][SAGA]: CHECK PARSED RESPONSE", resData);

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
      } else {
        yield put({
          type: actions.ADD_TASK_FAILURE,
          error: resData.error,
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

      const resData = yield apiResponse.json();
      console.log("[DELETE_TASK][SAGA]: CHECK PARSED RESPONSE", resData);

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
      } else {
        yield put({
          type: actions.DELETE_TASK_FAILURE,
          error: resData.error,
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

      const resData = yield apiResponse.json();
      console.log("[UPDATE_TASK][SAGA]: CHECK PARSED RESPONSE", resData);

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
      } else {
        yield put({
          type: actions.UPDATE_TASK_FAILURE,
          error: resData.error,
        });
      }
    } catch (e) {
      console.log("[UPDATE_TASK][SAGA]: INTERNAL ERROR", e);
      yield put({
        type: actions.UPDATE_TASK_FAILURE,
        loginSuccess: false,
        error: "There was an internal error. Please try again later.",
      });
    }
  });
}

function fetchTasksApi(payload) {
  return get(`tasks/${payload.user_id}`);
}

function addTasksApi(payload) {
  return post(`tasks/`, payload);
}

function deleteTasksApi(payload) {
  return post(`tasks/delete`, payload);
}

function updateTaskApi(payload) {
  return PUT(`tasks/${payload.task_id}`, payload);
}

export default function* rootSaga() {
  yield all([
    fork(fetchTasks),
    fork(addTasks),
    fork(deleteTasks),
    fork(updateTask),
  ]);
}
