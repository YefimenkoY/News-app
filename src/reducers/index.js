import { alertReducer } from 'react-redux-alerts';
import { reducer as formReducer } from 'redux-form'
import books from './books';
import saves from './saves';

export default {
  books,
  alerts: alertReducer,
  saves,
  form: formReducer,
};

