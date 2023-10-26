import { APP_INITIALIZER, NgModule, Optional, SkipSelf } from '@angular/core';
import { DynamicEnvironmentService } from './services/configure/dynamic-environment.service';
import {
  AppConfigService,
  appConfigInit,
} from './services/configure/app-configure.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './interceptors/http.interceptor';
import { ErrorLogInterceptor } from './interceptors/error-log.interceptor';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [],
  imports: [SharedModule],
  providers: [
    DynamicEnvironmentService,
    {
      provide: APP_INITIALIZER,
      useFactory: appConfigInit,
      multi: true,
      deps: [AppConfigService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorLogInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import CoreModule modules in the AppModule only.`
      );
    }
  }
}
