import { Injectable } from '@angular/core';

import { IAppConfig } from '@data/interfaces/app-config.interface';
import { AppConfigService } from './app-configure.service';

@Injectable({
  providedIn: 'root',
})
export class DynamicEnvironmentService {
  constructor(private appConfigService: AppConfigService) {}

  public getConfig(): IAppConfig {
    return this.appConfigService.getConfig();
  }
}
