import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FichePatient from './fiche-patient';
import FichePatientDetail from './fiche-patient-detail';
import FichePatientUpdate from './fiche-patient-update';
import FichePatientDeleteDialog from './fiche-patient-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FichePatientUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FichePatientUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FichePatientDetail} />
      <ErrorBoundaryRoute path={match.url} component={FichePatient} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={FichePatientDeleteDialog} />
  </>
);

export default Routes;
