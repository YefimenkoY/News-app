import AT from '../actions/types';
import AC from '../actions';
import { selectDetailBook } from '../selectors';

const select = store => next => action => {
  switch(action.type) {
    case AT.SELECT_BOOK:
      const selectBook = selectDetailBook(action.id)(store.getState());
      store.dispatch(AC.saveSelectBook(selectBook));
      break;
    
    default: next(action);
  }
};

export default select;