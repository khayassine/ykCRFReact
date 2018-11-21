import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Requette from './requette';
import RequetteDetail from './requette-detail';
import RequetteUpdate from './requette-update';
import RequetteDeleteDialog from './requette-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RequetteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RequetteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RequetteDetail} />
      <ErrorBoundaryRoute path={match.url} component={Requette} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RequetteDeleteDialog} />
  </>
);

export default Routes;
