import { Injectable } from '@angular/core';

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
    // const configResp: IAppConfig = await fetch(PATH_TO_FILE_JSON_CONFIG)
    //   .then((data) => {
    //     if (data.ok) {
    //       return data.json();
    //     }
    //     return null;
    //   })
    //   .catch((err) => console.error(err));
    const configResp = {
      version: '1.0.0',
      production: false,
      baseAPIUrl: 'https://api-core-dev.emirgroup.vn',
      authAPIUrl: 'https://api-authen-dev.emirgroup.vn/connect/token',
      userAPIUrl: 'https://api-core-dev.emirgroup.vn',
    };

    this.config = Object.assign({}, configResp);
  }
}

export function appConfigInit(appConfigService: AppConfigService) {
  return () => {
    return appConfigService.load();
  };
}
