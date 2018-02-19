import {put, call, takeEvery, select } from 'redux-saga/effects';
import { message } from 'antd';
import { getBooks } from '../api/end-points';
import { get } from '../api';
import actions from '../actions';
import { MAX_RESULTS } from '../constants/lists';

const {
  saveBooks, startLoading, stopLoading, fetchBooks
} = actions;

export function* fetchBooksSaga({ val: q }) {
  const { startIndex } = yield select((state) => state.books);
  const params = { q, startIndex, maxResults: MAX_RESULTS };
  const isShowInfo = startIndex < MAX_RESULTS;
  
  if (!q) return yield call(message.warn('Not found!'))
  
  yield put(startLoading());
  
  try {
    const { data: { items, totalItems } } = yield call(get, getBooks(), params);
    yield put(saveBooks(items));
    yield put(stopLoading());
    if (isShowInfo) {
      yield call(message.info, `Found ${totalItems} books!`);
    }
  } catch (e) {
    yield put(stopLoading())
    yield call(message.error, e.message)
  }
}

export function* watchFetchBooks() {
  yield takeEvery(fetchBooks().type, fetchBooksSaga)
}