import { alertReducer } from 'react-redux-alerts';
import books from './books';
import saves from './saves';

export default {
  books,
  alerts: alertReducer,
  saves,
};

