import message from 'antd/lib/message';
import { put, call, takeEvery, select } from 'redux-saga/effects';

import { getSaves } from '../api/end-points';
import { api } from '../api';
import actions from '../actions';
import { selectBook, checkExistingSaves } from '../selectors';
import statuses from '../constants/alertStatuses';
import AT from '../actions/types';


const { success, warn } = message;

export function * sendSavesSaga({ id }) {
  const book = yield select(selectBook(id));
  const isExistBook = yield select(checkExistingSaves(id));
  
  if (isExistBook) return yield call(warn, '1sdsdfdff23');
  
  const { data } = yield call(api.post, getSaves(), book );
  
  yield put(actions.saveFavorites(data));
  yield put(success(statuses.SUCCESS_ADD));
};

export function * sendSaveWatch() {
  yield takeEvery(AT.SEND_SAVE, sendSavesSaga)
}
