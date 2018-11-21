import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import etude, {
  EtudeState
} from 'app/entities/etude/etude.reducer';
// prettier-ignore
import formulaireTemplate, {
  FormulaireTemplateState
} from 'app/entities/formulaire-template/formulaire-template.reducer';
// prettier-ignore
import composantTemplate, {
  ComposantTemplateState
} from 'app/entities/composant-template/composant-template.reducer';
// prettier-ignore
import typeComposant, {
  TypeComposantState
} from 'app/entities/type-composant/type-composant.reducer';
// prettier-ignore
import validationComposant, {
  ValidationComposantState
} from 'app/entities/validation-composant/validation-composant.reducer';
// prettier-ignore
import regleValidation, {
  RegleValidationState
} from 'app/entities/regle-validation/regle-validation.reducer';
// prettier-ignore
import requette, {
  RequetteState
} from 'app/entities/requette/requette.reducer';
// prettier-ignore
import commentaireRequette, {
  CommentaireRequetteState
} from 'app/entities/commentaire-requette/commentaire-requette.reducer';
// prettier-ignore
import fichePatient, {
  FichePatientState
} from 'app/entities/fiche-patient/fiche-patient.reducer';
// prettier-ignore
import formulairePatient, {
  FormulairePatientState
} from 'app/entities/formulaire-patient/formulaire-patient.reducer';
// prettier-ignore
import composantValeur, {
  ComposantValeurState
} from 'app/entities/composant-valeur/composant-valeur.reducer';
// prettier-ignore
import centre, {
  CentreState
} from 'app/entities/centre/centre.reducer';
// prettier-ignore
import ville, {
  VilleState
} from 'app/entities/ville/ville.reducer';
// prettier-ignore
import region, {
  RegionState
} from 'app/entities/region/region.reducer';
// prettier-ignore
import sousRegion, {
  SousRegionState
} from 'app/entities/sous-region/sous-region.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly etude: EtudeState;
  readonly formulaireTemplate: FormulaireTemplateState;
  readonly composantTemplate: ComposantTemplateState;
  readonly typeComposant: TypeComposantState;
  readonly validationComposant: ValidationComposantState;
  readonly regleValidation: RegleValidationState;
  readonly requette: RequetteState;
  readonly commentaireRequette: CommentaireRequetteState;
  readonly fichePatient: FichePatientState;
  readonly formulairePatient: FormulairePatientState;
  readonly composantValeur: ComposantValeurState;
  readonly centre: CentreState;
  readonly ville: VilleState;
  readonly region: RegionState;
  readonly sousRegion: SousRegionState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  etude,
  formulaireTemplate,
  composantTemplate,
  typeComposant,
  validationComposant,
  regleValidation,
  requette,
  commentaireRequette,
  fichePatient,
  formulairePatient,
  composantValeur,
  centre,
  ville,
  region,
  sousRegion,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
