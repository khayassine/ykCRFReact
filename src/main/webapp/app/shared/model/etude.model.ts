export interface IEtude {
  id?: number;
  code?: string;
  titre?: string;
  description?: string;
  pageHtml?: string;
  cssGlobal?: string;
}

export const defaultValue: Readonly<IEtude> = {};
