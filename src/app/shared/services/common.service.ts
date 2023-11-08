import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { folder } from '../constants/app.const';

@Injectable()
export class CommonService extends BaseService {
  public uploadFileGetUrl(file: File, folderFnc = String('')) {
    const folderPath = `${folder}/${folderFnc}`;
    return this.requestPostFile(file, folderPath, `/api/v1/file/UploadFile`);
  }
}
