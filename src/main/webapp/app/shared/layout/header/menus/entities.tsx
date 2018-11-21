import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/etude">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Etude
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/formulaire-template">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Formulaire Template
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/composant-template">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Composant Template
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/type-composant">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Type Composant
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/validation-composant">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Validation Composant
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/regle-validation">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Regle Validation
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/requette">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Requette
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/commentaire-requette">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Commentaire Requette
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/fiche-patient">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Fiche Patient
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/formulaire-patient">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Formulaire Patient
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/composant-valeur">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Composant Valeur
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/centre">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Centre
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/ville">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Ville
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/region">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Region
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/sous-region">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Sous Region
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
