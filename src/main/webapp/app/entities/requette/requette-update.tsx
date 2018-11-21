import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IComposantValeur } from 'app/shared/model/composant-valeur.model';
import { getEntities as getComposantValeurs } from 'app/entities/composant-valeur/composant-valeur.reducer';
import { IValidationComposant } from 'app/shared/model/validation-composant.model';
import { getEntities as getValidationComposants } from 'app/entities/validation-composant/validation-composant.reducer';
import { getEntity, updateEntity, createEntity, reset } from './requette.reducer';
import { IRequette } from 'app/shared/model/requette.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRequetteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRequetteUpdateState {
  isNew: boolean;
  composantValeurId: string;
  validationComposantId: string;
}

export class RequetteUpdate extends React.Component<IRequetteUpdateProps, IRequetteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      composantValeurId: '0',
      validationComposantId: '0',
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

    this.props.getComposantValeurs();
    this.props.getValidationComposants();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { requetteEntity } = this.props;
      const entity = {
        ...requetteEntity,
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
    this.props.history.push('/entity/requette');
  };

  render() {
    const { requetteEntity, composantValeurs, validationComposants, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ykCrfApp.requette.home.createOrEditLabel">Create or edit a Requette</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : requetteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="requette-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="etatLabel">Etat</Label>
                  <AvInput
                    id="requette-etat"
                    type="select"
                    className="form-control"
                    name="etat"
                    value={(!isNew && requetteEntity.etat) || 'COMMENTED'}
                  >
                    <option value="COMMENTED">COMMENTED</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="composantValeur.id">Composant Valeur</Label>
                  <AvInput id="requette-composantValeur" type="select" className="form-control" name="composantValeurId">
                    <option value="" key="0" />
                    {composantValeurs
                      ? composantValeurs.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="validationComposant.id">Validation Composant</Label>
                  <AvInput id="requette-validationComposant" type="select" className="form-control" name="validationComposantId">
                    <option value="" key="0" />
                    {validationComposants
                      ? validationComposants.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/requette" replace color="info">
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
  composantValeurs: storeState.composantValeur.entities,
  validationComposants: storeState.validationComposant.entities,
  requetteEntity: storeState.requette.entity,
  loading: storeState.requette.loading,
  updating: storeState.requette.updating,
  updateSuccess: storeState.requette.updateSuccess
});

const mapDispatchToProps = {
  getComposantValeurs,
  getValidationComposants,
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
)(RequetteUpdate);
