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
        loadChildren: () =>
          import('@modules/customer/customer.module').then(
            (m) => m.CustomerModule
          ),
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
