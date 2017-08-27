import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../src/store';
import { reducers, middlewares } from '../src';
import createRoutes from '../src/routes';

import '../src/styles/main.scss';
const store = configureStore(reducers, middlewares);
const routes = createRoutes();

const app = document.getElementById('app');
app.className = 'main-content flex-grid flex-grid--height-auto';

ReactDOM.render(
  <Provider store={ store }>
    <Router routes={routes} history={browserHistory} />
  </Provider>,
  app
);
