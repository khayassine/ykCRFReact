import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './formulaire-patient.reducer';
import { IFormulairePatient } from 'app/shared/model/formulaire-patient.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFormulairePatientProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class FormulairePatient extends React.Component<IFormulairePatientProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { formulairePatientList, match } = this.props;
    return (
      <div>
        <h2 id="formulaire-patient-heading">
          Formulaire Patients
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Formulaire Patient
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Etat</th>
                <th>Fiche Patient</th>
                <th>Formulaire Template</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {formulairePatientList.map((formulairePatient, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${formulairePatient.id}`} color="link" size="sm">
                      {formulairePatient.id}
                    </Button>
                  </td>
                  <td>{formulairePatient.etat}</td>
                  <td>
                    {formulairePatient.fichePatientId ? (
                      <Link to={`fiche-patient/${formulairePatient.fichePatientId}`}>{formulairePatient.fichePatientId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {formulairePatient.formulaireTemplateId ? (
                      <Link to={`formulaire-template/${formulairePatient.formulaireTemplateId}`}>
                        {formulairePatient.formulaireTemplateId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${formulairePatient.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${formulairePatient.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${formulairePatient.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ formulairePatient }: IRootState) => ({
  formulairePatientList: formulairePatient.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormulairePatient);
