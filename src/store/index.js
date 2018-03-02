import { createStore, applyMiddleware, compose } from 'redux';

export default function(reducers, middlewares, initailState = {}) {
  const enhancers = [];
  if (DEV_ENV && typeof window === 'object' && typeof window.devToolsExtension !== 'undefined') {
    
    const debugEnhancer = window.devToolsExtension();
    enhancers.push(debugEnhancer)
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);
  enhancers.push(middlewareEnhancer)
  
  const store = createStore(reducers, initailState, compose(...enhancers))
  
  if (module.hot && DEV_ENV) {
    module.hot.accept('../reducers', () => {
      import('../reducers')
        .then(({ default: reducers }) => store.replaceReducer(reducers))
    })
  }

  return store;
}
