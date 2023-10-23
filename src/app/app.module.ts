import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { CoreModule } from './core/core.module';
import { SubnavComponent } from './layout/side-nav/subnav/subnav.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { BreadcrumbService } from './layout/breadcrumb/breadcrumb.service';
import { SharedModule } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    ContentLayoutComponent,
    AuthLayoutComponent,
    SubnavComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    OverlayModule,
    CdkMenuModule,
    SharedModule,
  ],
  providers: [BreadcrumbService],
  bootstrap: [AppComponent],
})
export class AppModule {}
