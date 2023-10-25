import { INavData } from '@app/data/interfaces/nav-data.interface';

export const navData: INavData[] = [
  {
    routerLink: 'home',
    icon: 'pi pi-home',
    label: 'Dashboard',
  },
  {
    routerLink: 'customer',
    icon: 'pi pi-bitcoin',
    label: 'Customer',
    children: [
      {
        routerLink: 'customer/event',
        icon: 'pi pi-youtube',
        label: 'Customer Event',
      },
      {
        routerLink: 'customer/info',
        icon: 'pi pi-discord',
        label: 'Customer Information',
      },
    ],
  },
  {
    routerLink: 'account',
    icon: 'pi pi-users',
    label: 'Tài khoản',
    children: [
      {
        routerLink: 'account-verified',
        icon: 'pi pi-users',
        label: 'Tài khoản xác minh',
      },
    ],
  },
  {
    routerLink: 'files',
    icon: 'pi pi-file',
    label: 'Files',
    children: [
      {
        routerLink: 'home/create',
        icon: 'pi pi-home',
        label: 'Files Create',
        children: [
          {
            routerLink: 'home/create',
            icon: 'pi pi-home',
            label: 'File Create lv2',
          },
          {
            routerLink: 'home/edit',
            icon: 'pi pi-home',
            label: 'Edit lv2',
          },
        ],
      },
      {
        routerLink: 'home/edit',
        icon: 'pi pi-home',
        label: 'Files Edit',
      },
    ],
  },
];
