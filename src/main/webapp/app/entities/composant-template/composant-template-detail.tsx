import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './composant-template.reducer';
import { IComposantTemplate } from 'app/shared/model/composant-template.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComposantTemplateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ComposantTemplateDetail extends React.Component<IComposantTemplateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { composantTemplateEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            ComposantTemplate [<b>{composantTemplateEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">Code</span>
            </dt>
            <dd>{composantTemplateEntity.code}</dd>
            <dt>
              <span id="titre">Titre</span>
            </dt>
            <dd>{composantTemplateEntity.titre}</dd>
            <dt>
              <span id="ordre">Ordre</span>
            </dt>
            <dd>{composantTemplateEntity.ordre}</dd>
            <dt>
              <span id="conditionAffichage">Condition Affichage</span>
            </dt>
            <dd>{composantTemplateEntity.conditionAffichage}</dd>
            <dt>
              <span id="texteDroite">Texte Droite</span>
            </dt>
            <dd>{composantTemplateEntity.texteDroite}</dd>
            <dt>
              <span id="cssStyle">Css Style</span>
            </dt>
            <dd>{composantTemplateEntity.cssStyle}</dd>
            <dt>Formulaire Template</dt>
            <dd>{composantTemplateEntity.formulaireTemplateId ? composantTemplateEntity.formulaireTemplateId : ''}</dd>
            <dt>Type Composant</dt>
            <dd>{composantTemplateEntity.typeComposantId ? composantTemplateEntity.typeComposantId : ''}</dd>
            <dt>Composant Template</dt>
            <dd>{composantTemplateEntity.composantTemplateId ? composantTemplateEntity.composantTemplateId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/composant-template" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/composant-template/${composantTemplateEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ composantTemplate }: IRootState) => ({
  composantTemplateEntity: composantTemplate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposantTemplateDetail);
