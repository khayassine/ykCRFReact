import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FormulaireTemplate from './formulaire-template';
import FormulaireTemplateDetail from './formulaire-template-detail';
import FormulaireTemplateUpdate from './formulaire-template-update';
import FormulaireTemplateDeleteDialog from './formulaire-template-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FormulaireTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FormulaireTemplateUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FormulaireTemplateDetail} />
      <ErrorBoundaryRoute path={match.url} component={FormulaireTemplate} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FormulaireTemplateDeleteDialog} />
  </>
);

export default Routes;
