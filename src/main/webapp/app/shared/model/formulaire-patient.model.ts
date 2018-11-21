import { IComposantValeur } from 'app/shared/model//composant-valeur.model';

export const enum EtatFormulaire {
  ND = 'ND',
  COMPLETED = 'COMPLETED',
  QUERIES = 'QUERIES',
  SIGNED = 'SIGNED'
}

export interface IFormulairePatient {
  id?: number;
  etat?: EtatFormulaire;
  fichePatientId?: number;
  formulaireTemplateId?: number;
  composantValeurs?: IComposantValeur[];
}

export const defaultValue: Readonly<IFormulairePatient> = {};
