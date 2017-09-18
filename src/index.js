import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../src/store';
import reducers from './reducers';
import middlewares from './middlewares';
import createRoutes from '../src/routes';

import '../src/styles/main.scss';

const store = configureStore(reducers, middlewares);
const routes = createRoutes();
const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  app
);