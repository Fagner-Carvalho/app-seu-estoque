import React from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Switch, Route, Redirect } from 'react-router-dom';

import history from 'src/routes/history';
import Login from 'src/views/login/Login';
import CreateUsers from 'src/views/users/CreateUsers';

import AppRoutes, { HOME } from './routes';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Redirect path="/" to={HOME} exact />
      <Route path={AppRoutes.Login} component={Login} exact />
      <Route path={AppRoutes.Dashboard} component={CreateUsers} exact />
      <Route
        path="*"
        render={() => (
          <div>
            Page - Not Found
          </div>
        )}
      />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
