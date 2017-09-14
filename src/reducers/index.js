import { alertReducer } from 'react-redux-alerts';
import books from './books';
import saves from './saves';
import winWidth from './winWidth';

export default {
  books,
  alerts: alertReducer,
  saves,
  winWidth,
};

