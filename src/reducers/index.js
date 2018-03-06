import { combineReducers } from 'redux';
import { alertReducer } from 'react-redux-alerts';
import { reducer as formReducer } from 'redux-form'

import books from './books';
import saves from './saves';

export default combineReducers({
  books,
  alerts: alertReducer,
  saves,
  form: formReducer,
})


