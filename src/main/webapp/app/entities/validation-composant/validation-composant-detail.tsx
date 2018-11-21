import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './validation-composant.reducer';
import { IValidationComposant } from 'app/shared/model/validation-composant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IValidationComposantDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ValidationComposantDetail extends React.Component<IValidationComposantDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { validationComposantEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ValidationComposant [<b>{validationComposantEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">Code</span>
            </dt>
            <dd>{validationComposantEntity.code}</dd>
            <dt>
              <span id="titre">Titre</span>
            </dt>
            <dd>{validationComposantEntity.titre}</dd>
            <dt>
              <span id="regexValidation">Regex Validation</span>
            </dt>
            <dd>{validationComposantEntity.regexValidation}</dd>
            <dt>
              <span id="signeComparaison">Signe Comparaison</span>
            </dt>
            <dd>{validationComposantEntity.signeComparaison}</dd>
            <dt>
              <span id="valeurComparaison">Valeur Comparaison</span>
            </dt>
            <dd>{validationComposantEntity.valeurComparaison}</dd>
            <dt>
              <span id="message">Message</span>
            </dt>
            <dd>{validationComposantEntity.message}</dd>
            <dt>
              <span id="niveauValidation">Niveau Validation</span>
            </dt>
            <dd>{validationComposantEntity.niveauValidation}</dd>
            <dt>Composant Template</dt>
            <dd>{validationComposantEntity.composantTemplateId ? validationComposantEntity.composantTemplateId : ''}</dd>
            <dt>Regle Validation</dt>
            <dd>{validationComposantEntity.regleValidationId ? validationComposantEntity.regleValidationId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/validation-composant" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/validation-composant/${validationComposantEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ validationComposant }: IRootState) => ({
  validationComposantEntity: validationComposant.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidationComposantDetail);
