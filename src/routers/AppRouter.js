import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import App from './../App';
import Header from './../components/Header';
import Comments from '../components/Comments';

const DefaultPage = () => (
  <div>404 Not Found</div>
);

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={App} exact={true} />
        <Route path="/item/:itemId" component={Comments} />
        <Route component={DefaultPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;