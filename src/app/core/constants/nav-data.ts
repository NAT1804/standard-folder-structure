import { INavData } from '@app/data/interfaces/nav-data.interface';

export const navData: INavData[] = [
  {
    routerLink: 'home',
    icon: 'fal fa-home',
    label: 'Dashboard',
    children: [
      {
        routerLink: 'home/create',
        icon: 'fal fa-home',
        label: 'Create',
      },
      {
        routerLink: 'home/edit',
        icon: 'fal fa-home',
        label: 'Edit',
      },
    ],
  },
  {
    routerLink: 'files',
    icon: 'fal fa-file',
    label: 'Files',
  },
];
