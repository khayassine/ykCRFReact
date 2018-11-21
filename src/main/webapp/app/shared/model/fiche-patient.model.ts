import { Moment } from 'moment';
import { IFormulairePatient } from 'app/shared/model//formulaire-patient.model';

export interface IFichePatient {
  id?: number;
  codePatient?: string;
  oneDate?: Moment;
  centreId?: number;
  formulairePatients?: IFormulairePatient[];
}

export const defaultValue: Readonly<IFichePatient> = {};
