import {put, call, takeEvery } from 'redux-saga/effects';
import { message } from 'antd';
import { getBooks } from '../api/end-points';
import { get } from '../api';
import actions from '../actions';

const {
  saveBooks, startLoading, stopLoading, showModal, fetchBooks
} = actions;

export function* fetchBooksSaga({ params }) {
  const { startIndex, maxResults } = params;
  const isShowInfo = startIndex < maxResults;
  
  yield put(startLoading());
  
  try {
    const { data: { items, totalItems } } = yield call(get, getBooks(), params);
    yield put(saveBooks(items));
    yield put(stopLoading());
    if (isShowInfo) {
      yield call([message.info, message.info], `Found ${totalItems} books!`);
    }
  } catch (e) {
    yield put(stopLoading())
    yield call([message.error, message.error], e.message)
  }
}

export function* watchFetchBooks() {
  yield takeEvery(fetchBooks().type, fetchBooksSaga)
}