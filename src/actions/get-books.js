import { bindActionCreators } from 'redux';
import { get } from '../api';
import { getBooks } from '../api/end-points';
import AC from './';

export const fetchBooks = params => async dispatch => {
  const {
    saveBooks, startLoading, stopLoading, showModal
  } = bindActionCreators({
    saveBooks: AC.saveBooks,
    stopLoading: AC.stopLoading,
    startLoading: AC.startLoading,
    showModal: AC.showModal,
  }, dispatch);
  
  startLoading();
  
  const { data } = await get( getBooks(), params );
  
  if (!data.totalItems) {
    stopLoading();
    return showModal('not-found');
  }
  
  saveBooks(data.items);
  stopLoading()
};