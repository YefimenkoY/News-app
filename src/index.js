import React from 'react';
import ReactDOM from 'react-dom';
import {all} from 'redux-saga/effects';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../src/store';
import reducers from './reducers';
import middlewares from './middlewares';
import createRoutes from '../src/routes';
import rootSaga from './sagas';
import { sagaMiddleware } from './middlewares'

import '../src/styles/main.scss';

const store = configureStore(reducers, middlewares);
const routes = createRoutes();
const app = document.getElementById('app');

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  app
);