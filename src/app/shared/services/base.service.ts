import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicEnvironmentService } from '@app/core/services/configure/dynamic-environment.service';
import { StorageService } from '@app/core/services/storage/storage.service';
import { Page } from '@app/data/model/page';
import { Observable, catchError, mergeMap, of, throwError } from 'rxjs';

export class BaseService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private storageService = inject(StorageService);
  private dynamicEnvironmentService = inject(DynamicEnvironmentService);
  protected BASE_URL = '';
  private jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.BASE_URL = this.dynamicEnvironmentService.getConfig().baseAPIUrl;
  }

  public requestPost(body: any, url: string) {
    let url_ = this.BASE_URL + url;
    url_ = url_.replace(/[?&]$/, '');
    const content = JSON.stringify(body);
    const options = {
      headers: this.createDefaultHeaders(),
    };

    return this.http
      .post(url_, content, options)
      .pipe(
        mergeMap((response: any) => {
          return of(response);
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(() => new Error(error.message));
        })
      );
  }

  public requestPostFile(file: File, folder: string, url: string) {
    let url_ = this.BASE_URL + url;
    url_ = url_.replace(/[?&]$/, '');
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('folder', folder);

    const options: any = {
      observe: 'response',
      responseType: 'blob',
      headers: {
        Accept: 'text/plain',
        ...this.storageService.getHeaderToken(),
      },
    };

    return this.http
      .post(url_, formData, options)
      .pipe(
        mergeMap((response: any) => {
          const responseBlob =
            response instanceof HttpResponse
              ? response.body
              : (<any>response).error instanceof Blob
              ? (<any>response).error
              : undefined;
          return this.blobToText(responseBlob).pipe(
            mergeMap((_responseText) => {
              const res =
                _responseText === ''
                  ? null
                  : JSON.parse(_responseText, this.jsonParseReviver);
              return of(typeof res === 'object' ? res : {});
            })
          );
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(() => new Error(error.message));
        })
      );
  }

  fromJS(data: any): object {
    data = typeof data === 'object' ? data : {};
    return data;
  }

  private blobToText(blob: any) {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next('');
        observer.complete();
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          observer.next((<any>event.target).result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }

  public requestGet(url: string) {
    let url_ = this.BASE_URL + url;
    url_ = url_.replace(/[?&]$/, '');
    const options = {
      headers: this.createDefaultHeaders(),
    };

    return this.http
      .get(url_, options)
      .pipe(
        mergeMap((response: any) => {
          return of(response);
        })
      )
      .pipe(
        catchError((error: any) => {
          return throwError(() => new Error(error.message));
        })
      );
  }

  private createDefaultHeaders() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/plain',
    });
  }

  protected convertParamUrl(name: string, value: number | string | boolean) {
    return name + '=' + encodeURIComponent('' + value) + '&';
  }

  protected convertPageParamUrl(page: Page) {
    let name = String('');
    name += this.convertParamUrl('offSet', page.getPageNumber());
    name += this.convertParamUrl('pageSize', page.pageSize);
    return name;
  }

  protected convertSortParamUrl(sort: Page) {
    const name = String('');
    // name += this.convertParamUrl('pageNumber', page.getPageNumber());
    // name += this.convertParamUrl('pageSize', page.pageSize);
    return name;
  }
}
