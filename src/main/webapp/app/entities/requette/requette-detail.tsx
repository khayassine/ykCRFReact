import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './requette.reducer';
import { IRequette } from 'app/shared/model/requette.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequetteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RequetteDetail extends React.Component<IRequetteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { requetteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Requette [<b>{requetteEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="etat">Etat</span>
            </dt>
            <dd>{requetteEntity.etat}</dd>
            <dt>Composant Valeur</dt>
            <dd>{requetteEntity.composantValeurId ? requetteEntity.composantValeurId : ''}</dd>
            <dt>Validation Composant</dt>
            <dd>{requetteEntity.validationComposantId ? requetteEntity.validationComposantId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/requette" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/requette/${requetteEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ requette }: IRootState) => ({
  requetteEntity: requette.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequetteDetail);
