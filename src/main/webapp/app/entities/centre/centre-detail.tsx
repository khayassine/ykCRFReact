import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './centre.reducer';
import { ICentre } from 'app/shared/model/centre.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICentreDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CentreDetail extends React.Component<ICentreDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { centreEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Centre [<b>{centreEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">Code</span>
            </dt>
            <dd>{centreEntity.code}</dd>
            <dt>
              <span id="titre">Titre</span>
            </dt>
            <dd>{centreEntity.titre}</dd>
            <dt>
              <span id="complement">Complement</span>
            </dt>
            <dd>{centreEntity.complement}</dd>
            <dt>Ville</dt>
            <dd>{centreEntity.villeId ? centreEntity.villeId : ''}</dd>
            <dt>Region</dt>
            <dd>{centreEntity.regionId ? centreEntity.regionId : ''}</dd>
            <dt>Sous Region</dt>
            <dd>{centreEntity.sousRegionId ? centreEntity.sousRegionId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/centre" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/centre/${centreEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ centre }: IRootState) => ({
  centreEntity: centre.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CentreDetail);
