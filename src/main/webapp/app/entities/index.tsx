import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Etude from './etude';
import FormulaireTemplate from './formulaire-template';
import ComposantTemplate from './composant-template';
import TypeComposant from './type-composant';
import ValidationComposant from './validation-composant';
import RegleValidation from './regle-validation';
import Requette from './requette';
import CommentaireRequette from './commentaire-requette';
import FichePatient from './fiche-patient';
import FormulairePatient from './formulaire-patient';
import ComposantValeur from './composant-valeur';
import Centre from './centre';
import Ville from './ville';
import Region from './region';
import SousRegion from './sous-region';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/etude`} component={Etude} />
      <ErrorBoundaryRoute path={`${match.url}/formulaire-template`} component={FormulaireTemplate} />
      <ErrorBoundaryRoute path={`${match.url}/composant-template`} component={ComposantTemplate} />
      <ErrorBoundaryRoute path={`${match.url}/type-composant`} component={TypeComposant} />
      <ErrorBoundaryRoute path={`${match.url}/validation-composant`} component={ValidationComposant} />
      <ErrorBoundaryRoute path={`${match.url}/regle-validation`} component={RegleValidation} />
      <ErrorBoundaryRoute path={`${match.url}/requette`} component={Requette} />
      <ErrorBoundaryRoute path={`${match.url}/commentaire-requette`} component={CommentaireRequette} />
      <ErrorBoundaryRoute path={`${match.url}/fiche-patient`} component={FichePatient} />
      <ErrorBoundaryRoute path={`${match.url}/formulaire-patient`} component={FormulairePatient} />
      <ErrorBoundaryRoute path={`${match.url}/composant-valeur`} component={ComposantValeur} />
      <ErrorBoundaryRoute path={`${match.url}/centre`} component={Centre} />
      <ErrorBoundaryRoute path={`${match.url}/ville`} component={Ville} />
      <ErrorBoundaryRoute path={`${match.url}/region`} component={Region} />
      <ErrorBoundaryRoute path={`${match.url}/sous-region`} component={SousRegion} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
