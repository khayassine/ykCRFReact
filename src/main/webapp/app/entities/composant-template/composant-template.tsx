import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './composant-template.reducer';
import { IComposantTemplate } from 'app/shared/model/composant-template.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IComposantTemplateProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IComposantTemplateState = IPaginationBaseState;

export class ComposantTemplate extends React.Component<IComposantTemplateProps, IComposantTemplateState> {
  state: IComposantTemplateState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { composantTemplateList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="composant-template-heading">
          Composant Templates
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Composant Template
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={this.sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('code')}>
                  Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('titre')}>
                  Titre <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('ordre')}>
                  Ordre <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('conditionAffichage')}>
                  Condition Affichage <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('texteDroite')}>
                  Texte Droite <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('cssStyle')}>
                  Css Style <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Formulaire Template <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Type Composant <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Composant Template <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {composantTemplateList.map((composantTemplate, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${composantTemplate.id}`} color="link" size="sm">
                      {composantTemplate.id}
                    </Button>
                  </td>
                  <td>{composantTemplate.code}</td>
                  <td>{composantTemplate.titre}</td>
                  <td>{composantTemplate.ordre}</td>
                  <td>{composantTemplate.conditionAffichage}</td>
                  <td>{composantTemplate.texteDroite}</td>
                  <td>{composantTemplate.cssStyle}</td>
                  <td>
                    {composantTemplate.formulaireTemplateId ? (
                      <Link to={`formulaire-template/${composantTemplate.formulaireTemplateId}`}>
                        {composantTemplate.formulaireTemplateId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {composantTemplate.typeComposantId ? (
                      <Link to={`type-composant/${composantTemplate.typeComposantId}`}>{composantTemplate.typeComposantId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {composantTemplate.composantTemplateId ? (
                      <Link to={`composant-template/${composantTemplate.composantTemplateId}`}>
                        {composantTemplate.composantTemplateId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${composantTemplate.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${composantTemplate.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${composantTemplate.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <Row className="justify-content-center">
          <JhiPagination
            items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
            activePage={this.state.activePage}
            onSelect={this.handlePagination}
            maxButtons={5}
          />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ composantTemplate }: IRootState) => ({
  composantTemplateList: composantTemplate.entities,
  totalItems: composantTemplate.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComposantTemplate);
