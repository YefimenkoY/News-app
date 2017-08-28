import { bindActionCreators } from 'redux';
import axios from 'axios';
import message from 'antd/lib/message';

import { getSaves } from '../api/end-points';
import actions from './';
import { selectBook, checkExistingSaves } from '../selectors';
import statuses from '../constants/alertStatuses';

const { success, warn } = message;

export const sendSaves = id => async (dispatch, getState) => {
  const { saveFavorites } = bindActionCreators(actions, dispatch);
  const book = selectBook(id)(getState());
  const isExistBook = checkExistingSaves(id)(getState());

  if (isExistBook) return warn(statuses.EXIST_BOOK);

  const { data } = await axios.post( getSaves(), book );

  saveFavorites(data);
  success(statuses.SUCCESS_ADD);
};
