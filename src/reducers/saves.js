import AT from '../actions/types';

const initialState = {
  saves: [],
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AT.SAVE_FAVORITES:
      return {
        ...state,
        saves: action.saves,
      };
    case AT.LOADING_START_FAVORITES:
      return {
        ...state,
        loading: true,
      };
    case AT.LOADING_STOP_FAVORITES:
      return {
        ...state,
        loading: false,
      };
    default: return state;
  }
};

