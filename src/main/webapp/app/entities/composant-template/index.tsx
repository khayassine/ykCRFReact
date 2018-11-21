import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ComposantTemplate from './composant-template';
import ComposantTemplateDetail from './composant-template-detail';
import ComposantTemplateUpdate from './composant-template-update';
import ComposantTemplateDeleteDialog from './composant-template-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ComposantTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ComposantTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ComposantTemplateDetail} />
      <ErrorBoundaryRoute path={match.url} component={ComposantTemplate} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ComposantTemplateDeleteDialog} />
  </>
);

export default Routes;
