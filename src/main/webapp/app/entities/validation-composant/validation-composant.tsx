import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './validation-composant.reducer';
import { IValidationComposant } from 'app/shared/model/validation-composant.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IValidationComposantProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IValidationComposantState = IPaginationBaseState;

export class ValidationComposant extends React.Component<IValidationComposantProps, IValidationComposantState> {
  state: IValidationComposantState = {
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
    const { validationComposantList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="validation-composant-heading">
          Validation Composants
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Validation Composant
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
                <th className="hand" onClick={this.sort('regexValidation')}>
                  Regex Validation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('signeComparaison')}>
                  Signe Comparaison <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('valeurComparaison')}>
                  Valeur Comparaison <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('message')}>
                  Message <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={this.sort('niveauValidation')}>
                  Niveau Validation <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Composant Template <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Regle Validation <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {validationComposantList.map((validationComposant, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${validationComposant.id}`} color="link" size="sm">
                      {validationComposant.id}
                    </Button>
                  </td>
                  <td>{validationComposant.code}</td>
                  <td>{validationComposant.titre}</td>
                  <td>{validationComposant.regexValidation}</td>
                  <td>{validationComposant.signeComparaison}</td>
                  <td>{validationComposant.valeurComparaison}</td>
                  <td>{validationComposant.message}</td>
                  <td>{validationComposant.niveauValidation}</td>
                  <td>
                    {validationComposant.composantTemplateId ? (
                      <Link to={`composant-template/${validationComposant.composantTemplateId}`}>
                        {validationComposant.composantTemplateId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {validationComposant.regleValidationId ? (
                      <Link to={`regle-validation/${validationComposant.regleValidationId}`}>{validationComposant.regleValidationId}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${validationComposant.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${validationComposant.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${validationComposant.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ validationComposant }: IRootState) => ({
  validationComposantList: validationComposant.entities,
  totalItems: validationComposant.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidationComposant);
