export const enum EtatValeur {
  ND = 'ND',
  COMPLETED = 'COMPLETED',
  QUERIES = 'QUERIES'
}

export interface IComposantValeur {
  id?: number;
  valeur?: string;
  etat?: EtatValeur;
  formulairePatientId?: number;
  composantTemplateId?: number;
}

export const defaultValue: Readonly<IComposantValeur> = {};
