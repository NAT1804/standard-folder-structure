import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentLayoutComponent } from '@layout/content-layout/content-layout.component';
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { NotfoundComponent } from './layout/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'customer',
        children: [
          {
            path: 'individual-customer',
            loadChildren: () =>
              import(
                '@app/modules/customer/individual-customer/module/individual-customer.module'
              ).then((m) => m.IndividualCustomerModule),
          },
          {
            path: 'business-customer',
            loadChildren: () =>
              import(
                '@app/modules/customer/business-customer/module/business-customer.module'
              ).then((m) => m.BusinessCustomerModule),
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: 'account-verified',
            loadChildren: () =>
              import(
                '@app/modules/account/account-verified/module/account-verified.module'
              ).then((m) => m.AccountVerifiedModule),
          },
        ],
      },
      {
        path: 'notification',
        children: [
          {
            path: 'default-notification',
            loadChildren: () =>
              import(
                '@app/modules/notification/default-notification/module/default-notification.module'
              ).then((m) => m.DefaultNotificationModule),
          },
          {
            path: 'flex-notification',
            loadChildren: () =>
              import(
                '@app/modules/notification/flex-notification/module/flex-notification.module'
              ).then((m) => m.FlexNotificationModule),
          },
        ],
      },
      {
        path: 'setting',
        children: [
          {
            path: 'setting-business',
            loadChildren: () =>
              import(
                '@app/modules/setting/setting-business/module/setting-business.module'
              ).then((m) => m.SettingBusinessModule),
          },
          {
            path: 'setting-signature',
            loadChildren: () =>
              import(
                '@app/modules/setting/setting-signature/module/setting-signature.module'
              ).then((m) => m.SettingSignatureModule),
          },
          {
            path: 'setting-send-noti',
            loadChildren: () =>
              import(
                '@app/modules/setting/setting-send-noti/module/setting-send-noti.module'
              ).then((m) => m.SettingSendNotiModule),
          },
        ],
      },
      {
        path: 'approve',
        children: [
          {
            path: 'approve-individual-customer',
            loadChildren: () =>
              import(
                '@app/modules/approve/approve-individual-customer/module/approve-individual-customer.module'
              ).then((m) => m.ApproveIndividualCustomerModule),
          },
          {
            path: 'approve-business-customer',
            loadChildren: () =>
              import(
                '@app/modules/approve/approve-business-customer/module/approve-business-customer.module'
              ).then((m) => m.ApproveBusinessCustomerModule),
          },
        ],
      },
      {
        path: 'media',
        children: [
          {
            path: 'media-image',
            loadChildren: () =>
              import(
                '@app/modules/media/media-image/module/media-image.module'
              ).then((m) => m.MediaImageModule),
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('@modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: 'notfound', component: NotfoundComponent },
  // Fallback when no prior routes is matched
  { path: '**', redirectTo: 'notfound', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
