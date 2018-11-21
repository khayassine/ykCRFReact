import { IRegion } from 'app/shared/model//region.model';

export interface IVille {
  id?: number;
  titre?: string;
  regions?: IRegion[];
}

export const defaultValue: Readonly<IVille> = {};
