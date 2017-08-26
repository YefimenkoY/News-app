import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app';
import BooksList from './containers/books';
import StartPage from './components/start-page';
import Saves from './containers/saves';

export default () => (
    <Route path='/' component={App} >
      <IndexRoute component={StartPage} />
      <Route path='/books' component={BooksList} />
      <Route path='/saves' component={Saves} />
    </Route>
);