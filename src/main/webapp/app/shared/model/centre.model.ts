export interface ICentre {
  id?: number;
  code?: string;
  titre?: string;
  complement?: string;
  villeId?: number;
  regionId?: number;
  sousRegionId?: number;
}

export const defaultValue: Readonly<ICentre> = {};
