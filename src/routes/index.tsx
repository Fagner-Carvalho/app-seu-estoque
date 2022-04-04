import React from 'react';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Switch, Route, Redirect } from 'react-router-dom';

import history from 'src/routes/history';
import Login from 'src/views/login/Login';
import Dashboard from 'src/views/dashboard/Dashboard';
import ListUsers from 'src/views/users/list';
import FormUsers from 'src/views/users/form';
import ListItems from 'src/views/items/list';
import FormItems from 'src/views/items/form';

import AppRoutes, { HOME } from './routes';

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Redirect path="/" to={HOME} exact />
      <Route path={AppRoutes.Login} component={Login} exact />
      <Route path={AppRoutes.ListUsers} component={ListUsers} exact />
      <Route path={AppRoutes.CreateUsers} component={FormUsers} exact />
      <Route path={AppRoutes.UpdateUsers} component={FormUsers} exact />
      <Route path={AppRoutes.ListItems} component={ListItems} exact />
      <Route path={AppRoutes.CreateItems} component={FormItems} exact />
      <Route path={AppRoutes.UpdateItems} component={FormItems} exact />
      <Route path={AppRoutes.Dashboard} component={Dashboard} exact />
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
