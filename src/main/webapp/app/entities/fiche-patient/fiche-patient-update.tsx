import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICentre } from 'app/shared/model/centre.model';
import { getEntities as getCentres } from 'app/entities/centre/centre.reducer';
import { getEntity, updateEntity, createEntity, reset } from './fiche-patient.reducer';
import { IFichePatient } from 'app/shared/model/fiche-patient.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFichePatientUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFichePatientUpdateState {
  isNew: boolean;
  centreId: string;
}

export class FichePatientUpdate extends React.Component<IFichePatientUpdateProps, IFichePatientUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      centreId: '0',
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

    this.props.getCentres();
  }

  saveEntity = (event, errors, values) => {
    values.oneDate = new Date(values.oneDate);

    if (errors.length === 0) {
      const { fichePatientEntity } = this.props;
      const entity = {
        ...fichePatientEntity,
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
    this.props.history.push('/entity/fiche-patient');
  };

  render() {
    const { fichePatientEntity, centres, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ykCrfApp.fichePatient.home.createOrEditLabel">Create or edit a FichePatient</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : fichePatientEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="fiche-patient-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codePatientLabel" for="codePatient">
                    Code Patient
                  </Label>
                  <AvField id="fiche-patient-codePatient" type="text" name="codePatient" />
                </AvGroup>
                <AvGroup>
                  <Label id="oneDateLabel" for="oneDate">
                    One Date
                  </Label>
                  <AvInput
                    id="fiche-patient-oneDate"
                    type="datetime-local"
                    className="form-control"
                    name="oneDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.fichePatientEntity.oneDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="centre.id">Centre</Label>
                  <AvInput id="fiche-patient-centre" type="select" className="form-control" name="centreId">
                    <option value="" key="0" />
                    {centres
                      ? centres.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/fiche-patient" replace color="info">
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
  centres: storeState.centre.entities,
  fichePatientEntity: storeState.fichePatient.entity,
  loading: storeState.fichePatient.loading,
  updating: storeState.fichePatient.updating,
  updateSuccess: storeState.fichePatient.updateSuccess
});

const mapDispatchToProps = {
  getCentres,
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
)(FichePatientUpdate);
