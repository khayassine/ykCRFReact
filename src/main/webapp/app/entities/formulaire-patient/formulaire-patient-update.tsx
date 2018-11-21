import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFichePatient } from 'app/shared/model/fiche-patient.model';
import { getEntities as getFichePatients } from 'app/entities/fiche-patient/fiche-patient.reducer';
import { IFormulaireTemplate } from 'app/shared/model/formulaire-template.model';
import { getEntities as getFormulaireTemplates } from 'app/entities/formulaire-template/formulaire-template.reducer';
import { getEntity, updateEntity, createEntity, reset } from './formulaire-patient.reducer';
import { IFormulairePatient } from 'app/shared/model/formulaire-patient.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFormulairePatientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFormulairePatientUpdateState {
  isNew: boolean;
  fichePatientId: string;
  formulaireTemplateId: string;
}

export class FormulairePatientUpdate extends React.Component<IFormulairePatientUpdateProps, IFormulairePatientUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      fichePatientId: '0',
      formulaireTemplateId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getFichePatients();
    this.props.getFormulaireTemplates();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { formulairePatientEntity } = this.props;
      const entity = {
        ...formulairePatientEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/formulaire-patient');
  };

  render() {
    const { formulairePatientEntity, fichePatients, formulaireTemplates, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ykCrfApp.formulairePatient.home.createOrEditLabel">Create or edit a FormulairePatient</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : formulairePatientEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="formulaire-patient-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="etatLabel">Etat</Label>
                  <AvInput
                    id="formulaire-patient-etat"
                    type="select"
                    className="form-control"
                    name="etat"
                    value={(!isNew && formulairePatientEntity.etat) || 'ND'}
                  >
                    <option value="ND">ND</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="QUERIES">QUERIES</option>
                    <option value="SIGNED">SIGNED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="fichePatient.id">Fiche Patient</Label>
                  <AvInput id="formulaire-patient-fichePatient" type="select" className="form-control" name="fichePatientId">
                    <option value="" key="0" />
                    {fichePatients
                      ? fichePatients.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="formulaireTemplate.id">Formulaire Template</Label>
                  <AvInput id="formulaire-patient-formulaireTemplate" type="select" className="form-control" name="formulaireTemplateId">
                    <option value="" key="0" />
                    {formulaireTemplates
                      ? formulaireTemplates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/formulaire-patient" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  fichePatients: storeState.fichePatient.entities,
  formulaireTemplates: storeState.formulaireTemplate.entities,
  formulairePatientEntity: storeState.formulairePatient.entity,
  loading: storeState.formulairePatient.loading,
  updating: storeState.formulairePatient.updating,
  updateSuccess: storeState.formulairePatient.updateSuccess
});

const mapDispatchToProps = {
  getFichePatients,
  getFormulaireTemplates,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormulairePatientUpdate);
