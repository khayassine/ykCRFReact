import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RegleValidation from './regle-validation';
import RegleValidationDetail from './regle-validation-detail';
import RegleValidationUpdate from './regle-validation-update';
import RegleValidationDeleteDialog from './regle-validation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RegleValidationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RegleValidationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RegleValidationDetail} />
      <ErrorBoundaryRoute path={match.url} component={RegleValidation} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RegleValidationDeleteDialog} />
  </>
);

export default Routes;
