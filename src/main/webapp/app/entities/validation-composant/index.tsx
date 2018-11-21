import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ValidationComposant from './validation-composant';
import ValidationComposantDetail from './validation-composant-detail';
import ValidationComposantUpdate from './validation-composant-update';
import ValidationComposantDeleteDialog from './validation-composant-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ValidationComposantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ValidationComposantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ValidationComposantDetail} />
      <ErrorBoundaryRoute path={match.url} component={ValidationComposant} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ValidationComposantDeleteDialog} />
  </>
);

export default Routes;
