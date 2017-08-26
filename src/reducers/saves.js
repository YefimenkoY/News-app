import AT from '../actions/types';

const initialState = {
  saves: [],
  loading: false,
};

const saves = (state = initialState, action) => {
  switch (action.type) {
    case AT.SAVE_FAVORITES:
      return {
        ...state,
        saves: action.saves,
      };
      break;
    case AT.LOADING_START_FAVORITES:
      return {
        ...state,
        loading: true,
      };
      break;
    case AT.LOADING_STOP_FAVORITES:
      return {
        ...state,
        loading: false,
      };
      break;
    default: return state;
  }
};

export default saves;
