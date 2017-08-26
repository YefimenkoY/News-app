import { fetchBooks } from './get-books';
import { fetchSaves } from './get-saves';
import { sendSaves } from './send-saave';
import { actions as alertActions } from 'react-redux-alerts';
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
  
  fetchBooks,
  fetchSaves,
  sendSaves,
  ...alertActions,
};
