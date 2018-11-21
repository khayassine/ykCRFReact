import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FormulairePatient from './formulaire-patient';
import FormulairePatientDetail from './formulaire-patient-detail';
import FormulairePatientUpdate from './formulaire-patient-update';
import FormulairePatientDeleteDialog from './formulaire-patient-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FormulairePatientUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FormulairePatientUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FormulairePatientDetail} />
      <ErrorBoundaryRoute path={match.url} component={FormulairePatient} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FormulairePatientDeleteDialog} />
  </>
);

export default Routes;
