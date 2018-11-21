import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './commentaire-requette.reducer';
import { ICommentaireRequette } from 'app/shared/model/commentaire-requette.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentaireRequetteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CommentaireRequetteDetail extends React.Component<ICommentaireRequetteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { commentaireRequetteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CommentaireRequette [<b>{commentaireRequetteEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="commentaire">Commentaire</span>
            </dt>
            <dd>{commentaireRequetteEntity.commentaire}</dd>
            <dt>Requette</dt>
            <dd>{commentaireRequetteEntity.requetteId ? commentaireRequetteEntity.requetteId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/commentaire-requette" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/commentaire-requette/${commentaireRequetteEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ commentaireRequette }: IRootState) => ({
  commentaireRequetteEntity: commentaireRequette.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentaireRequetteDetail);
