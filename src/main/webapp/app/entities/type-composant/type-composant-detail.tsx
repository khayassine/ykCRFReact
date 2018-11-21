import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './type-composant.reducer';
import { ITypeComposant } from 'app/shared/model/type-composant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITypeComposantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TypeComposantDetail extends React.Component<ITypeComposantDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { typeComposantEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            TypeComposant [<b>{typeComposantEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">Code</span>
            </dt>
            <dd>{typeComposantEntity.code}</dd>
            <dt>
              <span id="titre">Titre</span>
            </dt>
            <dd>{typeComposantEntity.titre}</dd>
            <dt>
              <span id="cssStyle">Css Style</span>
            </dt>
            <dd>{typeComposantEntity.cssStyle}</dd>
          </dl>
          <Button tag={Link} to="/entity/type-composant" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/type-composant/${typeComposantEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ typeComposant }: IRootState) => ({
  typeComposantEntity: typeComposant.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeComposantDetail);
