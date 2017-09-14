import AT from '../actions/types';

const initialState = 0;


const winWidth = (state = initialState, action) => {
  switch (action.type) {
    case AT.SET_CURRENT_WIN_WIDTH:
      return action.width;
      
    default: return state;
  }
};

export default winWidth;
