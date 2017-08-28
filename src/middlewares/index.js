import logger from 'redux-logger';
import thunk from 'redux-thunk';

const DEV_ENV = 'development';
const NODE_ENV = process.env.NODE_ENV || DEV_ENV;

const middlewares = [thunk];
if (NODE_ENV === DEV_ENV) {
  middlewares.push(logger);
}

export default middlewares;
