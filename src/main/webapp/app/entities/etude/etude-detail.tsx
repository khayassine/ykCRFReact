import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './etude.reducer';
import { IEtude } from 'app/shared/model/etude.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEtudeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EtudeDetail extends React.Component<IEtudeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { etudeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Etude [<b>{etudeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">Code</span>
            </dt>
            <dd>{etudeEntity.code}</dd>
            <dt>
              <span id="titre">Titre</span>
            </dt>
            <dd>{etudeEntity.titre}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{etudeEntity.description}</dd>
            <dt>
              <span id="pageHtml">Page Html</span>
            </dt>
            <dd>{etudeEntity.pageHtml}</dd>
            <dt>
              <span id="cssGlobal">Css Global</span>
            </dt>
            <dd>{etudeEntity.cssGlobal}</dd>
          </dl>
          <Button tag={Link} to="/entity/etude" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/etude/${etudeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ etude }: IRootState) => ({
  etudeEntity: etude.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EtudeDetail);
