import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TypeComposant from './type-composant';
import TypeComposantDetail from './type-composant-detail';
import TypeComposantUpdate from './type-composant-update';
import TypeComposantDeleteDialog from './type-composant-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TypeComposantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TypeComposantUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TypeComposantDetail} />
      <ErrorBoundaryRoute path={match.url} component={TypeComposant} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TypeComposantDeleteDialog} />
  </>
);

export default Routes;
