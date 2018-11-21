import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './composant-valeur.reducer';
import { IComposantValeur } from 'app/shared/model/composant-valeur.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComposantValeurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ComposantValeurDetail extends React.Component<IComposantValeurDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { composantValeurEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ComposantValeur [<b>{composantValeurEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="valeur">Valeur</span>
            </dt>
            <dd>{composantValeurEntity.valeur}</dd>
            <dt>
              <span id="etat">Etat</span>
            </dt>
            <dd>{composantValeurEntity.etat}</dd>
            <dt>Formulaire Patient</dt>
            <dd>{composantValeurEntity.formulairePatientId ? composantValeurEntity.formulairePatientId : ''}</dd>
            <dt>Composant Template</dt>
            <dd>{composantValeurEntity.composantTemplateId ? composantValeurEntity.composantTemplateId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/composant-valeur" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/composant-valeur/${composantValeurEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ composantValeur }: IRootState) => ({
  composantValeurEntity: composantValeur.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposantValeurDetail);
