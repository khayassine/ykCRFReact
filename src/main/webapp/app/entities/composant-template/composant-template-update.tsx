import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFormulaireTemplate } from 'app/shared/model/formulaire-template.model';
import { getEntities as getFormulaireTemplates } from 'app/entities/formulaire-template/formulaire-template.reducer';
import { ITypeComposant } from 'app/shared/model/type-composant.model';
import { getEntities as getTypeComposants } from 'app/entities/type-composant/type-composant.reducer';
import { getEntities as getComposantTemplates } from 'app/entities/composant-template/composant-template.reducer';
import { getEntity, updateEntity, createEntity, reset } from './composant-template.reducer';
import { IComposantTemplate } from 'app/shared/model/composant-template.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IComposantTemplateUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IComposantTemplateUpdateState {
  isNew: boolean;
  formulaireTemplateId: string;
  typeComposantId: string;
  composantTemplateId: string;
  sousComposantId: string;
}

export class ComposantTemplateUpdate extends React.Component<IComposantTemplateUpdateProps, IComposantTemplateUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      formulaireTemplateId: '0',
      typeComposantId: '0',
      composantTemplateId: '0',
      sousComposantId: '0',
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

    this.props.getFormulaireTemplates();
    this.props.getTypeComposants();
    this.props.getComposantTemplates();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { composantTemplateEntity } = this.props;
      const entity = {
        ...composantTemplateEntity,
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
    this.props.history.push('/entity/composant-template');
  };

  render() {
    const { composantTemplateEntity, formulaireTemplates, typeComposants, composantTemplates, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ykCrfApp.composantTemplate.home.createOrEditLabel">Create or edit a ComposantTemplate</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : composantTemplateEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="composant-template-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codeLabel" for="code">
                    Code
                  </Label>
                  <AvField
                    id="composant-template-code"
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
                    id="composant-template-titre"
                    type="text"
                    name="titre"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="ordreLabel" for="ordre">
                    Ordre
                  </Label>
                  <AvField
                    id="composant-template-ordre"
                    type="string"
                    className="form-control"
                    name="ordre"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      number: { value: true, errorMessage: 'This field should be a number.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="conditionAffichageLabel" for="conditionAffichage">
                    Condition Affichage
                  </Label>
                  <AvField id="composant-template-conditionAffichage" type="text" name="conditionAffichage" />
                </AvGroup>
                <AvGroup>
                  <Label id="texteDroiteLabel" for="texteDroite">
                    Texte Droite
                  </Label>
                  <AvField id="composant-template-texteDroite" type="text" name="texteDroite" />
                </AvGroup>
                <AvGroup>
                  <Label id="cssStyleLabel" for="cssStyle">
                    Css Style
                  </Label>
                  <AvField id="composant-template-cssStyle" type="text" name="cssStyle" />
                </AvGroup>
                <AvGroup>
                  <Label for="formulaireTemplate.id">Formulaire Template</Label>
                  <AvInput id="composant-template-formulaireTemplate" type="select" className="form-control" name="formulaireTemplateId">
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
                <AvGroup>
                  <Label for="typeComposant.id">Type Composant</Label>
                  <AvInput id="composant-template-typeComposant" type="select" className="form-control" name="typeComposantId">
                    <option value="" key="0" />
                    {typeComposants
                      ? typeComposants.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="composantTemplate.id">Composant Template</Label>
                  <AvInput id="composant-template-composantTemplate" type="select" className="form-control" name="composantTemplateId">
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
                <Button tag={Link} id="cancel-save" to="/entity/composant-template" replace color="info">
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
  formulaireTemplates: storeState.formulaireTemplate.entities,
  typeComposants: storeState.typeComposant.entities,
  composantTemplates: storeState.composantTemplate.entities,
  composantTemplateEntity: storeState.composantTemplate.entity,
  loading: storeState.composantTemplate.loading,
  updating: storeState.composantTemplate.updating,
  updateSuccess: storeState.composantTemplate.updateSuccess
});

const mapDispatchToProps = {
  getFormulaireTemplates,
  getTypeComposants,
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
)(ComposantTemplateUpdate);
