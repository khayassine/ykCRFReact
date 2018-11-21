import { ISousRegion } from 'app/shared/model//sous-region.model';

export interface IRegion {
  id?: number;
  titre?: string;
  villeId?: number;
  sousRegions?: ISousRegion[];
}

export const defaultValue: Readonly<IRegion> = {};
