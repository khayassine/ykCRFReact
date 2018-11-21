export interface IRegleValidation {
  id?: number;
  code?: string;
  titre?: string;
  regexValidation?: string;
  signeComparaison?: string;
  message?: string;
}

export const defaultValue: Readonly<IRegleValidation> = {};
