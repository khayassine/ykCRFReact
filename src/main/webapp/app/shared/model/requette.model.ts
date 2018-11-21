import { ICommentaireRequette } from 'app/shared/model//commentaire-requette.model';

export const enum EtatRequette {
  COMMENTED = 'COMMENTED',
  RESOLVED = 'RESOLVED'
}

export interface IRequette {
  id?: number;
  etat?: EtatRequette;
  composantValeurId?: number;
  validationComposantId?: number;
  commentaireRequettes?: ICommentaireRequette[];
}

export const defaultValue: Readonly<IRequette> = {};
