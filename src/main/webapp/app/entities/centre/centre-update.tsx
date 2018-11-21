import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IVille } from 'app/shared/model/ville.model';
import { getEntities as getVilles } from 'app/entities/ville/ville.reducer';
import { IRegion } from 'app/shared/model/region.model';
import { getEntities as getRegions } from 'app/entities/region/region.reducer';
import { ISousRegion } from 'app/shared/model/sous-region.model';
import { getEntities as getSousRegions } from 'app/entities/sous-region/sous-region.reducer';
import { getEntity, updateEntity, createEntity, reset } from './centre.reducer';
import { ICentre } from 'app/shared/model/centre.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICentreUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICentreUpdateState {
  isNew: boolean;
  villeId: string;
  regionId: string;
  sousRegionId: string;
}

export class CentreUpdate extends React.Component<ICentreUpdateProps, ICentreUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      villeId: '0',
      regionId: '0',
      sousRegionId: '0',
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

    this.props.getVilles();
    this.props.getRegions();
    this.props.getSousRegions();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { centreEntity } = this.props;
      const entity = {
        ...centreEntity,
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
    this.props.history.push('/entity/centre');
  };

  render() {
    const { centreEntity, villes, regions, sousRegions, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="ykCrfApp.centre.home.createOrEditLabel">Create or edit a Centre</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : centreEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="centre-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="codeLabel" for="code">
                    Code
                  </Label>
                  <AvField id="centre-code" type="text" name="code" />
                </AvGroup>
                <AvGroup>
                  <Label id="titreLabel" for="titre">
                    Titre
                  </Label>
                  <AvField id="centre-titre" type="text" name="titre" />
                </AvGroup>
                <AvGroup>
                  <Label id="complementLabel" for="complement">
                    Complement
                  </Label>
                  <AvField id="centre-complement" type="text" name="complement" />
                </AvGroup>
                <AvGroup>
                  <Label for="ville.id">Ville</Label>
                  <AvInput id="centre-ville" type="select" className="form-control" name="villeId">
                    <option value="" key="0" />
                    {villes
                      ? villes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="region.id">Region</Label>
                  <AvInput id="centre-region" type="select" className="form-control" name="regionId">
                    <option value="" key="0" />
                    {regions
                      ? regions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="sousRegion.id">Sous Region</Label>
                  <AvInput id="centre-sousRegion" type="select" className="form-control" name="sousRegionId">
                    <option value="" key="0" />
                    {sousRegions
                      ? sousRegions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/centre" replace color="info">
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
  villes: storeState.ville.entities,
  regions: storeState.region.entities,
  sousRegions: storeState.sousRegion.entities,
  centreEntity: storeState.centre.entity,
  loading: storeState.centre.loading,
  updating: storeState.centre.updating,
  updateSuccess: storeState.centre.updateSuccess
});

const mapDispatchToProps = {
  getVilles,
  getRegions,
  getSousRegions,
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
)(CentreUpdate);
