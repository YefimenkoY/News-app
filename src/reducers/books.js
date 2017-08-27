import AT from '../actions/types';

const initialState = {
  books: null,
  startIndex: 0,
  loading: false,
  searchVal: '',
  modalType: null,
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case AT.SAVE_BOOKS:
      return {
        ...state,
        books: [...state.books, ...action.books],
        startIndex: state.startIndex += 10
      };
    break;
    case AT.LOADING_START:
      return {
        ...state,
        loading: true,
      };
      break;
    case AT.LOADING_STOP:
      return {
        ...state,
        loading: false,
      };
      break;
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
      }
    case AT.SHOW_MODAL:
      return {
        ...state,
        modalType: action.modalType,
      }
    case AT.CLEAR_MODAL_TYPE:
      return {
        ...state,
        modalType: null,
        text: '',
      }
    
    
    default: return state;
  }
};

export default books;
