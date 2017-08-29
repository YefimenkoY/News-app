import { bindActionCreators } from 'redux';
import { message } from 'antd';

import { get } from '../api';
import { getBooks } from '../api/end-points';
import actions from './';


export const fetchBooks = params => async dispatch => {
  const {
    saveBooks, startLoading, stopLoading, showModal
  } = bindActionCreators(actions, dispatch);
  const { startIndex, maxResults } = params;
  const isShowInfo = startIndex < maxResults;

  startLoading();

  const { data: { items, totalItems } } = await get( getBooks(), params );

  if (!totalItems) {
    stopLoading();
    showModal('not-found');
    return;
  }

  saveBooks(items);
  stopLoading();
  isShowInfo && message.info(`Found ${totalItems} books!`);
};