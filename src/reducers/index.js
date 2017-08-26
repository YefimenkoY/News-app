import books from './books';
import saves from './saves';
import { alertReducer } from 'react-redux-alerts';

export default {
  books,
  alerts: alertReducer,
  saves,
  };

