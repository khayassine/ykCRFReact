import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './regle-validation.reducer';
import { IRegleValidation } from 'app/shared/model/regle-validation.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRegleValidationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRegleValidationUpdateState {
  isNew: boolean;
}

export class RegleValidationUpdate extends React.Component<IRegleValidationUpdateProps, IRegleValidationUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { regleValidationEntity } = this.props;
      const entity = {
        ...regleValidationEntity,
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
    this.props.history.push('/entity/regle-validation');
  };

  render() {
    const { regleValidationEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ykCrfApp.regleValidation.home.createOrEditLabel">Create or edit a RegleValidation</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : regleValidationEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="regle-validation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codeLabel" for="code">
                    Code
                  </Label>
                  <AvField
                    id="regle-validation-code"
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
                    id="regle-validation-titre"
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
                  <AvField id="regle-validation-regexValidation" type="text" name="regexValidation" />
                </AvGroup>
                <AvGroup>
                  <Label id="signeComparaisonLabel" for="signeComparaison">
                    Signe Comparaison
                  </Label>
                  <AvField id="regle-validation-signeComparaison" type="text" name="signeComparaison" />
                </AvGroup>
                <AvGroup>
                  <Label id="messageLabel" for="message">
                    Message
                  </Label>
                  <AvField id="regle-validation-message" type="text" name="message" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/regle-validation" replace color="info">
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
  regleValidationEntity: storeState.regleValidation.entity,
  loading: storeState.regleValidation.loading,
  updating: storeState.regleValidation.updating,
  updateSuccess: storeState.regleValidation.updateSuccess
});

const mapDispatchToProps = {
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
)(RegleValidationUpdate);
