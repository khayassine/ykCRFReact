import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IComposantTemplate } from 'app/shared/model/composant-template.model';
import { getEntities as getComposantTemplates } from 'app/entities/composant-template/composant-template.reducer';
import { IRegleValidation } from 'app/shared/model/regle-validation.model';
import { getEntities as getRegleValidations } from 'app/entities/regle-validation/regle-validation.reducer';
import { getEntity, updateEntity, createEntity, reset } from './validation-composant.reducer';
import { IValidationComposant } from 'app/shared/model/validation-composant.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IValidationComposantUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IValidationComposantUpdateState {
  isNew: boolean;
  composantTemplateId: string;
  regleValidationId: string;
}

export class ValidationComposantUpdate extends React.Component<IValidationComposantUpdateProps, IValidationComposantUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      composantTemplateId: '0',
      regleValidationId: '0',
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

    this.props.getComposantTemplates();
    this.props.getRegleValidations();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { validationComposantEntity } = this.props;
      const entity = {
        ...validationComposantEntity,
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
    this.props.history.push('/entity/validation-composant');
  };

  render() {
    const { validationComposantEntity, composantTemplates, regleValidations, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ykCrfApp.validationComposant.home.createOrEditLabel">Create or edit a ValidationComposant</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : validationComposantEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="validation-composant-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codeLabel" for="code">
                    Code
                  </Label>
                  <AvField
                    id="validation-composant-code"
                    type="text"
                    name="code"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="titreLabel" for="titre">
                    Titre
                  </Label>
                  <AvField
                    id="validation-composant-titre"
                    type="text"
                    name="titre"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="regexValidationLabel" for="regexValidation">
                    Regex Validation
                  </Label>
                  <AvField id="validation-composant-regexValidation" type="text" name="regexValidation" />
                </AvGroup>
                <AvGroup>
                  <Label id="signeComparaisonLabel" for="signeComparaison">
                    Signe Comparaison
                  </Label>
                  <AvField id="validation-composant-signeComparaison" type="text" name="signeComparaison" />
                </AvGroup>
                <AvGroup>
                  <Label id="valeurComparaisonLabel" for="valeurComparaison">
                    Valeur Comparaison
                  </Label>
                  <AvField id="validation-composant-valeurComparaison" type="text" name="valeurComparaison" />
                </AvGroup>
                <AvGroup>
                  <Label id="messageLabel" for="message">
                    Message
                  </Label>
                  <AvField id="validation-composant-message" type="text" name="message" />
                </AvGroup>
                <AvGroup>
                  <Label id="niveauValidationLabel">Niveau Validation</Label>
                  <AvInput
                    id="validation-composant-niveauValidation"
                    type="select"
                    className="form-control"
                    name="niveauValidation"
                    value={(!isNew && validationComposantEntity.niveauValidation) || 'WARNING'}
                  >
                    <option value="WARNING">WARNING</option>
                    <option value="INFO">INFO</option>
                    <option value="ERROR">ERROR</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="composantTemplate.id">Composant Template</Label>
                  <AvInput id="validation-composant-composantTemplate" type="select" className="form-control" name="composantTemplateId">
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
                <AvGroup>
                  <Label for="regleValidation.id">Regle Validation</Label>
                  <AvInput id="validation-composant-regleValidation" type="select" className="form-control" name="regleValidationId">
                    <option value="" key="0" />
                    {regleValidations
                      ? regleValidations.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/validation-composant" replace color="info">
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
  composantTemplates: storeState.composantTemplate.entities,
  regleValidations: storeState.regleValidation.entities,
  validationComposantEntity: storeState.validationComposant.entity,
  loading: storeState.validationComposant.loading,
  updating: storeState.validationComposant.updating,
  updateSuccess: storeState.validationComposant.updateSuccess
});

const mapDispatchToProps = {
  getComposantTemplates,
  getRegleValidations,
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
)(ValidationComposantUpdate);
