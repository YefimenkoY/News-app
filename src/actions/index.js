import { actions as alertActions } from 'react-redux-alerts';

import { fetchBooks } from './get-books';
import { sendSaves } from './send-saave';
import { deleteSave } from './delete-save';
import AT from './types';

export default {
  
  saveBooks: books => (
    { type: AT.SAVE_BOOKS, books }
  ),
  
  startLoading: () => (
    { type: AT.LOADING_START }
  ),
  
  stopLoading: () => (
    { type: AT.LOADING_STOP }
  ),
  
  clearBookList: () => (
    { type: AT.CLEAR_BOOKS }
  ),
  
  setSearchVal: val => (
    { type: AT.SET_SEARCH_VAL, val }
  ),
  
  saveFavorites: saves => (
    { type: AT.SAVE_FAVORITES, saves }
  ),
  
  startLoadingFav: () => (
    { type: AT.LOADING_START_FAVORITES }
  ),
  
  stopLoadingFav: () => (
    { type: AT.LOADING_STOP_FAVORITES }
  ),
  
  showModal: (modalType) => (
    { type: AT.SHOW_MODAL, modalType }
  ),
  
  clearModalType: () => (
    { type: AT.CLEAR_MODAL_TYPE, }
  ),
  
  resetStartIndex: () => (
    { type: AT.RESET_START_INDEX }
  ),
  
  fetchSavesSaga: () => (
    { type: AT.FETCH_SAVES_SAGA, test: 'test' }
  ),
  
  fetchBooks,
  sendSaves,
  ...alertActions,
  deleteSave,
};
