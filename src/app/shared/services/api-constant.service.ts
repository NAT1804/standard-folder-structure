import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IDropdown } from '@app/data/interfaces/interface';
import { STATUS_RESPONSE, folder } from '../constants/app.const';
import { mapDropdownDTOToIDropdown } from '../function-common';

@Injectable({
  providedIn: 'root',
})
export class ApiConstantService extends BaseService {
  private readonly baseAPI = '/api/v1/common';

  public _listNation: BehaviorSubject<IDropdown[] | undefined>;
  public _listNation$: Observable<IDropdown[] | undefined>;

  constructor() {
    super();

    this._listNation = new BehaviorSubject<IDropdown[] | undefined>(undefined);
    this._listNation$ = this._listNation.asObservable();
  }

  public getListNation() {
    this.requestGet(String(this.baseAPI + '/GetCountries')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          this._listNation.next(mapDropdownDTOToIDropdown(res.data));
        }
      }
    );
  }

  public uploadFileGetUrl(file: File, folderFnc = String('')) {
    const folderPath = `${folder}/${folderFnc}`;
    return this.requestPostFile(file, folderPath, `/api/v1/file/UploadFile`);
  }

  public downloadFile(fileSrc: string) {
    let url = String('/api/v1/file/DownloadFile?');
    url += this.convertParamUrl('link', fileSrc);
    return this.requestDownloadFile(url);
  }
}
