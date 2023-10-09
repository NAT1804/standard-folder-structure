import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomLayoutComponent } from './layout/custom-layout/custom-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
