import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRequette } from 'app/shared/model/requette.model';
import { getEntities as getRequettes } from 'app/entities/requette/requette.reducer';
import { getEntity, updateEntity, createEntity, reset } from './commentaire-requette.reducer';
import { ICommentaireRequette } from 'app/shared/model/commentaire-requette.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICommentaireRequetteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICommentaireRequetteUpdateState {
  isNew: boolean;
  requetteId: string;
}

export class CommentaireRequetteUpdate extends React.Component<ICommentaireRequetteUpdateProps, ICommentaireRequetteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      requetteId: '0',
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

    this.props.getRequettes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { commentaireRequetteEntity } = this.props;
      const entity = {
        ...commentaireRequetteEntity,
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
    this.props.history.push('/entity/commentaire-requette');
  };

  render() {
    const { commentaireRequetteEntity, requettes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ykCrfApp.commentaireRequette.home.createOrEditLabel">Create or edit a CommentaireRequette</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : commentaireRequetteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="commentaire-requette-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="commentaireLabel" for="commentaire">
                    Commentaire
                  </Label>
                  <AvField id="commentaire-requette-commentaire" type="text" name="commentaire" />
                </AvGroup>
                <AvGroup>
                  <Label for="requette.id">Requette</Label>
                  <AvInput id="commentaire-requette-requette" type="select" className="form-control" name="requetteId">
                    <option value="" key="0" />
                    {requettes
                      ? requettes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/commentaire-requette" replace color="info">
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
  requettes: storeState.requette.entities,
  commentaireRequetteEntity: storeState.commentaireRequette.entity,
  loading: storeState.commentaireRequette.loading,
  updating: storeState.commentaireRequette.updating,
  updateSuccess: storeState.commentaireRequette.updateSuccess
});

const mapDispatchToProps = {
  getRequettes,
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
)(CommentaireRequetteUpdate);
