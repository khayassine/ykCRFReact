export interface ICommentaireRequette {
  id?: number;
  commentaire?: string;
  requetteId?: number;
}

export const defaultValue: Readonly<ICommentaireRequette> = {};
