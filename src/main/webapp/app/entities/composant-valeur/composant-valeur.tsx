import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './composant-valeur.reducer';
import { IComposantValeur } from 'app/shared/model/composant-valeur.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComposantValeurProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ComposantValeur extends React.Component<IComposantValeurProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { composantValeurList, match } = this.props;
    return (
      <div>
        <h2 id="composant-valeur-heading">
          Composant Valeurs
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Composant Valeur
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Valeur</th>
                <th>Etat</th>
                <th>Formulaire Patient</th>
                <th>Composant Template</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {composantValeurList.map((composantValeur, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${composantValeur.id}`} color="link" size="sm">
                      {composantValeur.id}
                    </Button>
                  </td>
                  <td>{composantValeur.valeur}</td>
                  <td>{composantValeur.etat}</td>
                  <td>
                    {composantValeur.formulairePatientId ? (
                      <Link to={`formulaire-patient/${composantValeur.formulairePatientId}`}>{composantValeur.formulairePatientId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {composantValeur.composantTemplateId ? (
                      <Link to={`composant-template/${composantValeur.composantTemplateId}`}>{composantValeur.composantTemplateId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${composantValeur.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${composantValeur.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${composantValeur.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ composantValeur }: IRootState) => ({
  composantValeurList: composantValeur.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposantValeur);
