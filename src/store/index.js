import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';



export default function(reducers, middlewares, initailState = {}) {
  
  const store = createStore(reducers, initailState, composeWithDevTools(
    applyMiddleware(...middlewares),
  ))
  
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const next = require('../reducers').default;
      store.replaceReducer(next())
    })
    
  }

  return store;
}
