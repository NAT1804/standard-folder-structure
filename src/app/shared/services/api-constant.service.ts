import { Injectable } from '@angular/core';
import { IDropdown } from '@app/data/interfaces/interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { STATUS_RESPONSE, folder } from '../constants/app.const';
import { mapDropdownDTOToIDropdown } from '../function-common';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ApiConstantService extends BaseService {
  private readonly baseAPI = '/api/v1/common';

  public _listNation: BehaviorSubject<IDropdown[] | undefined>;
  public _listNation$: Observable<IDropdown[] | undefined>;
  public _listBank: BehaviorSubject<IDropdown[] | undefined>;
  public _listBank$: Observable<IDropdown[] | undefined>;

  constructor() {
    super();

    this._listNation = new BehaviorSubject<IDropdown[] | undefined>(undefined);
    this._listNation$ = this._listNation.asObservable();
    this._listBank = new BehaviorSubject<IDropdown[] | undefined>(undefined);
    this._listBank$ = this._listBank.asObservable();
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

  public getListBank() {
    this.requestGet(String(this.baseAPI + '/GetBankCodes')).subscribe(
      (res: any) => {
        if (res.status === STATUS_RESPONSE.SUCCESS) {
          const listBank = res.data.map(
            (e: any) =>
              ({
                value: e.bank_code,
                label: `${e.short_name} - ${e.bank_name}`,
              }) as IDropdown
          );
          this._listBank.next(listBank);
        }
      }
    );
  }

  public uploadFileGetUrl(file: File, folderFnc = String('')) {
    const folderPath = `${folder}/${folderFnc}`;
    return this.requestPostFile(file, folderPath, `/api/v1/file/UploadFile`);
  }

  public downloadFile(fileSrc: string, fileNameSrc: string) {
    let url = String('/api/v1/file/DownloadFile?');
    url += this.convertParamUrl('link', fileSrc);
    return this.requestDownloadFile(url, fileNameSrc);
  }
}
