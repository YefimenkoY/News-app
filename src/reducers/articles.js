import AT from '../actions/types';

const initialState = {
  articles: null,
};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case AT.SAVE_ARTICLES:
      return {
        ...state,
        articles: action.articles,
      };
    break;
    
    default: return state;
  }
};

export default articles;
