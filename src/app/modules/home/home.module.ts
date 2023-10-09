import { NgModule } from '@angular/core';

import { HomeComponent } from './page/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule],
  providers: [],
})
export class HomeModule {}
