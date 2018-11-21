import { IValidationComposant } from 'app/shared/model//validation-composant.model';
import { IComposantTemplate } from 'app/shared/model//composant-template.model';

export interface IComposantTemplate {
  id?: number;
  code?: string;
  titre?: string;
  ordre?: number;
  conditionAffichage?: string;
  texteDroite?: string;
  cssStyle?: string;
  formulaireTemplateId?: number;
  typeComposantId?: number;
  validationComposants?: IValidationComposant[];
  composantTemplateId?: number;
  sousComposants?: IComposantTemplate[];
}

export const defaultValue: Readonly<IComposantTemplate> = {};
