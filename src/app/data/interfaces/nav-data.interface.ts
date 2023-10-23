export interface INavData {
  routerLink: string;
  icon?: string;
  label: string;
  expanded?: boolean;
  children?: INavData[];
}

export interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
  isHover?: boolean;
}
