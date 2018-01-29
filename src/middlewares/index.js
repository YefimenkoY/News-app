import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

export const sagaMiddleware = createSagaMiddleware();
const DEV_ENV = 'development';
const NODE_ENV = process.env.NODE_ENV || DEV_ENV;

const middlewares = [sagaMiddleware, thunk];

if (NODE_ENV === DEV_ENV) {
  middlewares.push(logger);
}

export default middlewares;
