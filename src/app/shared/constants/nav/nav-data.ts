import { INavData } from '@app/data/interfaces/nav-data.interface';

export const navData: INavData[] = [
  {
    routerLink: 'home',
    icon: 'pi pi-home',
    label: 'Dashboard',
  },
  {
    routerLink: 'customer',
    icon: 'pi pi-users',
    label: 'Khách hàng',
    children: [
      {
        routerLink: 'individual-customer',
        icon: 'pi pi-users',
        label: 'Khách hàng cá nhân',
      },
      {
        routerLink: 'business-customer',
        icon: 'pi pi-users',
        label: 'Khách hàng doanh nghiệp',
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
    routerLink: 'notification',
    icon: 'pi pi-users',
    label: 'Thông báo',
    children: [
      {
        routerLink: 'default-notification',
        icon: 'pi pi-users',
        label: 'Thông báo mặc định',
      },
      {
        routerLink: 'flex-notification',
        icon: 'pi pi-users',
        label: 'Thông báo linh động',
      },
    ],
  },
  {
    routerLink: 'setting',
    icon: 'pi pi-users',
    label: 'Cài đặt chung',
    children: [
      {
        routerLink: 'setting-business',
        icon: 'pi pi-users',
        label: 'Thông tin doanh nghiệp',
      },
      {
        routerLink: 'setting-signature',
        icon: 'pi pi-users',
        label: 'Chữ ký số',
      },
      {
        routerLink: 'setting-send-noti',
        icon: 'pi pi-users',
        label: 'Thông số gửi báo cáo',
      },
    ],
  },
  {
    routerLink: 'approve',
    icon: 'pi pi-users',
    label: 'Quản lý phê duyệt',
    children: [
      {
        routerLink: 'approve-individual-customer',
        icon: 'pi pi-users',
        label: 'Khách hàng cá nhân',
      },
      {
        routerLink: 'approve-business-customer',
        icon: 'pi pi-users',
        label: 'Khách hàng doanh nghiệp',
      },
    ],
  },
];
