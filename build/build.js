import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../src/store';

import { App, reducers, middlewares } from '../src';

const store = configureStore(reducers, middlewares);

const app = document.getElementById('app');
app.className = 'main-content flex-grid flex-grid--height-auto';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  app
);
