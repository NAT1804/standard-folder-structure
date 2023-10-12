export interface INavData {
  routerLink: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  children?: INavData[];
}
