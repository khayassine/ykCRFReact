import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFormulairePatient } from 'app/shared/model/formulaire-patient.model';
import { getEntities as getFormulairePatients } from 'app/entities/formulaire-patient/formulaire-patient.reducer';
import { IComposantTemplate } from 'app/shared/model/composant-template.model';
import { getEntities as getComposantTemplates } from 'app/entities/composant-template/composant-template.reducer';
import { getEntity, updateEntity, createEntity, reset } from './composant-valeur.reducer';
import { IComposantValeur } from 'app/shared/model/composant-valeur.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IComposantValeurUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IComposantValeurUpdateState {
  isNew: boolean;
  formulairePatientId: string;
  composantTemplateId: string;
}

export class ComposantValeurUpdate extends React.Component<IComposantValeurUpdateProps, IComposantValeurUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      formulairePatientId: '0',
      composantTemplateId: '0',
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

    this.props.getFormulairePatients();
    this.props.getComposantTemplates();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { composantValeurEntity } = this.props;
      const entity = {
        ...composantValeurEntity,
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
    this.props.history.push('/entity/composant-valeur');
  };

  render() {
    const { composantValeurEntity, formulairePatients, composantTemplates, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ykCrfApp.composantValeur.home.createOrEditLabel">Create or edit a ComposantValeur</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : composantValeurEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="composant-valeur-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="valeurLabel" for="valeur">
                    Valeur
                  </Label>
                  <AvField id="composant-valeur-valeur" type="text" name="valeur" />
                </AvGroup>
                <AvGroup>
                  <Label id="etatLabel">Etat</Label>
                  <AvInput
                    id="composant-valeur-etat"
                    type="select"
                    className="form-control"
                    name="etat"
                    value={(!isNew && composantValeurEntity.etat) || 'ND'}
                  >
                    <option value="ND">ND</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="QUERIES">QUERIES</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="formulairePatient.id">Formulaire Patient</Label>
                  <AvInput id="composant-valeur-formulairePatient" type="select" className="form-control" name="formulairePatientId">
                    <option value="" key="0" />
                    {formulairePatients
                      ? formulairePatients.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="composantTemplate.id">Composant Template</Label>
                  <AvInput id="composant-valeur-composantTemplate" type="select" className="form-control" name="composantTemplateId">
                    <option value="" key="0" />
                    {composantTemplates
                      ? composantTemplates.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/composant-valeur" replace color="info">
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
  formulairePatients: storeState.formulairePatient.entities,
  composantTemplates: storeState.composantTemplate.entities,
  composantValeurEntity: storeState.composantValeur.entity,
  loading: storeState.composantValeur.loading,
  updating: storeState.composantValeur.updating,
  updateSuccess: storeState.composantValeur.updateSuccess
});

const mapDispatchToProps = {
  getFormulairePatients,
  getComposantTemplates,
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
)(ComposantValeurUpdate);
