import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CommentaireRequette from './commentaire-requette';
import CommentaireRequetteDetail from './commentaire-requette-detail';
import CommentaireRequetteUpdate from './commentaire-requette-update';
import CommentaireRequetteDeleteDialog from './commentaire-requette-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CommentaireRequetteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CommentaireRequetteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CommentaireRequetteDetail} />
      <ErrorBoundaryRoute path={match.url} component={CommentaireRequette} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CommentaireRequetteDeleteDialog} />
  </>
);

export default Routes;
