import { bindActionCreators } from 'redux';
import { get } from '../api';
import { getBooks } from '../api/end-points';
import actions from './';

export const fetchBooks = params => async dispatch => {
  const {
    saveBooks, startLoading, stopLoading, showModal
  } = bindActionCreators(actions, dispatch);
  
  startLoading();
  
  const { data } = await get( getBooks(), params );
  
  if (!data.totalItems) {
    stopLoading();
    showModal('not-found');
    return;
  }
  
  saveBooks(data.items);
  stopLoading()
};