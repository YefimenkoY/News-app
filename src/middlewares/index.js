import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'

import { history } from '../';

export const sagaMiddleware = createSagaMiddleware();
const DEV_ENV = 'development';
const NODE_ENV = process.env.NODE_ENV || DEV_ENV;
const routerRedux = routerMiddleware(history);

const middlewares = [routerRedux, sagaMiddleware, thunk];

if (NODE_ENV === DEV_ENV) {
  middlewares.push(logger);
}

export default middlewares;
