import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './fiche-patient.reducer';
import { IFichePatient } from 'app/shared/model/fiche-patient.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFichePatientDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FichePatientDetail extends React.Component<IFichePatientDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { fichePatientEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            FichePatient [<b>{fichePatientEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="codePatient">Code Patient</span>
            </dt>
            <dd>{fichePatientEntity.codePatient}</dd>
            <dt>
              <span id="oneDate">One Date</span>
            </dt>
            <dd>
              <TextFormat value={fichePatientEntity.oneDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Centre</dt>
            <dd>{fichePatientEntity.centreId ? fichePatientEntity.centreId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/fiche-patient" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/fiche-patient/${fichePatientEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ fichePatient }: IRootState) => ({
  fichePatientEntity: fichePatient.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FichePatientDetail);
