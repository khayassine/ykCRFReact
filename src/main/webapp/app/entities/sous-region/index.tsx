import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SousRegion from './sous-region';
import SousRegionDetail from './sous-region-detail';
import SousRegionUpdate from './sous-region-update';
import SousRegionDeleteDialog from './sous-region-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SousRegionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SousRegionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SousRegionDetail} />
      <ErrorBoundaryRoute path={match.url} component={SousRegion} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SousRegionDeleteDialog} />
  </>
);

export default Routes;
