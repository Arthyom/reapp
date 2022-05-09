import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigsService } from '../configs/configs.service';

import { catchError, debounce, delay, delayWhen, map, mergeMap, reduce, retry, retryWhen, scan, take, tap } from 'rxjs/operators';
import { asyncScheduler, EMPTY, from, interval, Observable, observable, of, scheduled, throwError } from 'rxjs';
import { GUIService } from '../GUI/gui.service';
import { RequestGeneralConfs } from '../../../models/configs/requestGeneralConfs';
import { lowExclutions, uppCases } from '../../../models/upperCaseExclutions';
import { inject } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';


export abstract class BaseService {

  protected url: string;



  public get configsBase(): any {
    return this.settings.decriptedSettings;
  }

  public get isLoged(): boolean {
    if (this.settings.decriptedSettings.usuario &&
      this.settings.decriptedSettings.idPersona &&
      this.settings.decriptedSettings.pwd) {
      return true;
    }
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
    protected nativeHttp: HTTP
  ) {
    this.url = `${environment.baseUrl}${resource}`;
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
  public post<T>(body: any = this.settings.decriptedSettings, resource: string = null, filter = true) {
    body = this.addConfigs(body);
    body = this.encodeData(body);

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const parsedBody = new HttpParams({ fromObject: body });

    this.url = resource ? `${environment.baseUrl}${resource}` : this.url;


    if (!filter) {
      return this.http.post(this.url, parsedBody).pipe(
        retryWhen(error => this.reTry(error, 0, 2000, this.url, parsedBody)),
        map((dataToMap: any) => this.extrarProperties(dataToMap)),
        map((dataToCast: any) => dataToCast as T)
      );
    }

    return this.http.post(this.url, parsedBody).pipe(
      retryWhen(error => this.reTry(error, 0, 2000, this.url, parsedBody)),
      catchError((x, s) => this.sendNativeRequest(this.url, parsedBody)),
      map((dataToMap: any) => dataToMap?.datoscaja ? dataToMap.datoscaja : dataToMap),
      map((dataToMap: any) => dataToMap?.usuario ? dataToMap.usuario : dataToMap),
      map((dataToMap: any) => this.extractSubProperties(dataToMap)),
      map((dataToCast: any) => dataToCast as T)
    );
  }

  private reTry(error, repeatTimes, wait, url, parsedBody) {
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
          //this.guiService.showAlertModalOnlyButtons(this.guiService.alertServerError);
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
        if (uppCases.find((uppCase) => key === uppCase)) {
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
        if (key !== 'nombre') {
          body[key] = this.settings.decriptedSettings[key];
        }
      }
    }
    return body;
  }

  private extractSubProperties(body: any) {
    // convert to lower case all key from body param even it is an array
    const lowerArray: any[] = [];
    for (const numberKey in body) {
      if (Object.prototype.hasOwnProperty.call(body, numberKey)) {
        if (Number.isInteger(Number.parseInt(numberKey, 10))) {
          const newObject: any = {};
          const upperBody = body[numberKey];
          for (const upperKey in upperBody) {
            if (Object.prototype.hasOwnProperty.call(upperBody, upperKey)) {
              const lowerKey = upperKey[0].toLocaleLowerCase() + upperKey.substr(1);
              newObject[lowerKey] = upperBody[upperKey];
            }
          }
          lowerArray.push(newObject);
        }
      }
    }
    return lowerArray.length > 1 ? lowerArray : lowerArray[0];
  }

  private extrarProperties(body: any) {
    const newObject: any = {};
    for (const upperKey in body) {
      if (Object.prototype.hasOwnProperty.call(body, upperKey)) {
        const lowerKey = upperKey[0].toLocaleLowerCase() + upperKey.substr(1);
        newObject[lowerKey] = body[upperKey];
      }
    }
    return newObject;
  }

  private async sendNativeRequest(url: string, parsedBody) {
    this.nativeHttp.setServerTrustMode('nocheck');
    this.nativeHttp.setDataSerializer('urlencoded');
    return await this.nativeHttp.post(url, parsedBody, {});
  }
}
