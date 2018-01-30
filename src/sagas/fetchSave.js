import {put, call, takeEvery } from 'redux-saga/effects';
import { getSaves } from '../api/end-points';
import { api } from '../api';
import actions from '../actions';

const {
  saveFavorites,
  stopLoadingFav,
  fetchSaves,
  startLoadingFav,
} = actions;

export function* fetchSavesSaga() {
  try {
    yield put(startLoadingFav());
    
    const { data } = yield call([api.get, api], getSaves());
    
    yield put(saveFavorites(data))
    yield put(stopLoadingFav())
  } catch (e) {
    yield put(stopLoadingFav())
  }
  
 
}

export function* watchFetchSaves() {
  yield takeEvery(fetchSaves().type, fetchSavesSaga)
}