import { IComposantTemplate } from 'app/shared/model//composant-template.model';

export interface IFormulaireTemplate {
  id?: number;
  code?: string;
  titre?: string;
  version?: string;
  composantTemplates?: IComposantTemplate[];
}

export const defaultValue: Readonly<IFormulaireTemplate> = {};
