import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ComposantValeur from './composant-valeur';
import ComposantValeurDetail from './composant-valeur-detail';
import ComposantValeurUpdate from './composant-valeur-update';
import ComposantValeurDeleteDialog from './composant-valeur-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ComposantValeurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ComposantValeurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ComposantValeurDetail} />
      <ErrorBoundaryRoute path={match.url} component={ComposantValeur} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ComposantValeurDeleteDialog} />
  </>
);

export default Routes;
