import {put, all, call, takeEvery } from 'redux-saga/effects';
import { getSaves } from '../api/end-points';
import { api } from '../api';
import AT from '../actions/types';

export function * fetchSavesSaga(action) {
  
  const { data } = yield call([api.get, api], getSaves());
  console.log('SAGA', data, action);
  yield put({
    type: AT.SAVE_FAVORITES,
    saves: data,
  })
  
  yield put({
    type: AT.LOADING_STOP_FAVORITES,
  })
}

export function* watchFetchSaves() {
  yield takeEvery(AT.FETCH_SAVES_SAGA, fetchSavesSaga)
}