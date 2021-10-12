import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigsService } from '../configs/configs.service';

import { catchError, debounce, delay, delayWhen, map, mergeMap, reduce, retry, retryWhen, scan, take, tap } from 'rxjs/operators';
import { asyncScheduler, EMPTY, from, interval, Observable, observable, of, scheduled, throwError } from 'rxjs';
import { GUIService } from '../GUI/gui.service';
import { RequestGeneralConfs } from '../../../models/configs/requestGeneralConfs';
import { lowExclutions, uppExclutions } from '../../../models/upperCaseExclutions';
import { inject } from '@angular/core';

export abstract class BaseService {

  protected url: string;

  public set config(configs: RequestGeneralConfs) {
    this.settings.decriptedSettings = configs;
    this.settings.encryptedSettings = this.encodeData(configs);
  }

  public set activeUser(user) {
    this.settings.activeUser = user;
  }



  /**
   * Use the base service to create your services
   *
   * @param http      Angular http cliente service
   * @param settings  Application settings
   * @param resource  Target service to send a request
   */
  constructor(
    protected readonly http: HttpClient,
    protected settings: ConfigsService,
    resource: string,
    public guiService: GUIService = null,
  ) {
    this.url = `${environment.baseUrl}/${resource}`;
  }

  /**
   * Triggers a HTTP request by GET Method. It needs improve  value types
   *
   * @param params [params] Any data to be sent to the server
   */
  public get<T>(params: HttpParams | { [param: string]: string | string[] }) {

  }


  /**
   *Triggers a HTTP request by POST Method. It needs improve  value types
   *
   * @param data [data] Any data to be sent to the server
   */
  public post<T>(body: any = null, resource: string = null) {
    body = this.addConfigs(body);
    body = this.encodeData(body);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const parsedBody = new HttpParams({ fromObject: body });

    this.url = resource ? `${environment.baseUrl}/${resource}` : this.url;


    return this.http.post(this.url, parsedBody).pipe(
      //   retryWhen(error => this.reTry(error, 9, 2000)),
      /*map((dataToMap: any) => {
         if( typeof(dataToMap) === '' )
         console.log('revicsds ', dataToMap);
         const mappedObject: any = {};
         for (const key in dataToMap) {
           if (Object.prototype.hasOwnProperty.call(dataToMap, key)) {
             if (!lowExclutions.find((exclution) => key === exclution)) {
               const lowKey = key[0].toLocaleLowerCase() + key.substr(1);
               mappedObject[lowKey] = dataToMap[key];
             }
             else {
               mappedObject[key] = dataToMap[key];
             }
           }
         }
         return mappedObject;
       }),*/
      map((dataToMap: any) => dataToMap?.datoscaja ? dataToMap.datoscaja : dataToMap),
      map((dataToCast: any) => dataToCast as T)
    );
  }

  private reTry(error, repeatTimes, wait) {
    return error.pipe(
      mergeMap((err: any) => {
        if (err.status !== 200) {
          return of(err);
        }
        return throwError(err);
      }),
      scan((acc, errr) => {
        if (acc > repeatTimes) {
          this.guiService.cancelAllLoading();
          this.guiService.showAlertModalOnlyButtons(this.guiService.alertServerError);
          throw errr;
        }
        return acc + 1;
      }, 0),
      delay(wait),
    );
  }

  private encodeData(data: any) {
    const encoded: any = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = btoa(data[key]);
        if (!uppExclutions.find((exclution) => key === exclution)) {
          const uppKey = key[0].toUpperCase() + key.substr(1);
          encoded[uppKey] = element;
        }
        else {
          encoded[key] = element;
        }
      }
    }
    return encoded;
  }

  private addConfigs(body: any) {
    for (const key in this.settings.decriptedSettings) {
      if (Object.prototype.hasOwnProperty.call(this.settings.decriptedSettings, key)) {
        body[key] = this.settings.decriptedSettings[key];
      }
    }
    return body;
  }


}
