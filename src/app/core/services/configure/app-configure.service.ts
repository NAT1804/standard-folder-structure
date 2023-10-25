import { Injectable } from '@angular/core';

import { PATH_TO_FILE_JSON_CONFIG } from '@shared/constants';
import { IAppConfig } from '@data/interfaces/app-config.interface';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private config!: IAppConfig;

  public getConfig(): IAppConfig {
    return this.config;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async load(): Promise<any> {
    const configResp: IAppConfig = await fetch(PATH_TO_FILE_JSON_CONFIG)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        return null;
      })
      .catch((err) => console.error(err));

    this.config = Object.assign({}, configResp);
  }
}

export function appConfigInit(appConfigService: AppConfigService) {
  return () => {
    return appConfigService.load();
  };
}
