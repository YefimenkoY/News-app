import AT from '../actions/types';
import { MAX_RESULTS } from '../constants/lists';

const initialState = {
  books: null,
  startIndex: 0,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AT.SAVE_BOOKS:
      return {
        ...state,
        books: [...state.books, ...action.books],
        startIndex: state.startIndex + MAX_RESULTS + 1
      };
    case AT.LOADING_START:
      return { ...state, loading: true };
    case AT.LOADING_STOP:
      return { ...state, loading: false };
    case AT.CLEAR_BOOKS:
      return {
        ...state,
        books: [],
        startIndex: 0
      };
    case AT.SET_SEARCH_VAL:
      return {
        ...state,
        searchVal: action.val
      };
    case AT.SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
      };
    case AT.CLEAR_MODAL_TYPE:
      return {
        ...state,
        modalType: null,
        text: '',
      };
    case AT.RESET_START_INDEX:
      return { ...state, startIndex: 0 };

    default: return state;
  }
};

