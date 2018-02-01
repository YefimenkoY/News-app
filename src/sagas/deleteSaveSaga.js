import {put, call, takeEvery } from 'redux-saga/effects';
import { message } from 'antd';
import statuses from '../constants/alertStatuses';
import { getSaves } from '../api/end-points';
import { remove } from '../api';
import actions from '../actions';

const {
  saveFavorites,
  stopLoadingFav,
  deleteSave,
  startLoadingFav,
} = actions;

export function* deleteSaveSaga({ id }) {
  const params = { id };
  
  try {
    yield put(startLoadingFav());
    
    const { data } = yield call(
      remove,
      getSaves(), 
      params
    );
    
    yield put(saveFavorites(data))
    yield put(stopLoadingFav())
    yield call(message.success, statuses.SUCCESS_DELETE)
  } catch (e) {
    yield put(stopLoadingFav())
  }
  
  
}

export function* watchDeleteSave() {
  yield takeEvery(deleteSave().type, deleteSaveSaga)
}