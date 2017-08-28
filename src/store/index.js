'use strict';

import {createStore, applyMiddleware, compose, combineReducers} from 'redux';

export default function configureStore(reducers, middlewares) {
  const finalCreateStore = compose(
    applyMiddleware(...middlewares),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension() : f => f
  )(createStore);

  return finalCreateStore(combineReducers(reducers), {});
}
