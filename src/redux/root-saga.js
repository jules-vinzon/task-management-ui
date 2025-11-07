import { all } from 'redux-saga/effects';
import sampleSaga from './sampleRedux/saga';
import AuthSaga from './auth/saga';
import TasksSaga from './tasks/saga';

export default function* rootSaga(getState) {
  yield all([
    sampleSaga(),
    AuthSaga(),
    TasksSaga()
  ]);
}
