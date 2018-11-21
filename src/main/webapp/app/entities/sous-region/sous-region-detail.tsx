import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './sous-region.reducer';
import { ISousRegion } from 'app/shared/model/sous-region.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISousRegionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SousRegionDetail extends React.Component<ISousRegionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { sousRegionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            SousRegion [<b>{sousRegionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="titre">Titre</span>
            </dt>
            <dd>{sousRegionEntity.titre}</dd>
            <dt>Region</dt>
            <dd>{sousRegionEntity.regionId ? sousRegionEntity.regionId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/sous-region" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/sous-region/${sousRegionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ sousRegion }: IRootState) => ({
  sousRegionEntity: sousRegion.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SousRegionDetail);