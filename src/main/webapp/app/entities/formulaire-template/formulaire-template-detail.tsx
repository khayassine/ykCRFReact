import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './formulaire-template.reducer';
import { IFormulaireTemplate } from 'app/shared/model/formulaire-template.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFormulaireTemplateDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FormulaireTemplateDetail extends React.Component<IFormulaireTemplateDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { formulaireTemplateEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            FormulaireTemplate [<b>{formulaireTemplateEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="code">Code</span>
            </dt>
            <dd>{formulaireTemplateEntity.code}</dd>
            <dt>
              <span id="titre">Titre</span>
            </dt>
            <dd>{formulaireTemplateEntity.titre}</dd>
            <dt>
              <span id="version">Version</span>
            </dt>
            <dd>{formulaireTemplateEntity.version}</dd>
          </dl>
          <Button tag={Link} to="/entity/formulaire-template" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/formulaire-template/${formulaireTemplateEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ formulaireTemplate }: IRootState) => ({
  formulaireTemplateEntity: formulaireTemplate.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormulaireTemplateDetail);
