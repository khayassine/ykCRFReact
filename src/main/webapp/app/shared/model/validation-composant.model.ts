export const enum NiveauValidation {
  WARNING = 'WARNING',
  INFO = 'INFO',
  ERROR = 'ERROR'
}

export interface IValidationComposant {
  id?: number;
  code?: string;
  titre?: string;
  regexValidation?: string;
  signeComparaison?: string;
  valeurComparaison?: string;
  message?: string;
  niveauValidation?: NiveauValidation;
  composantTemplateId?: number;
  regleValidationId?: number;
}

export const defaultValue: Readonly<IValidationComposant> = {};
