import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigsService } from '../configs/configs.service';

import { catchError, debounce, delay, delayWhen, map, mergeMap, retry, retryWhen, scan, take, tap } from 'rxjs/operators';
import { asyncScheduler, EMPTY, from, interval, Observable, observable, of, scheduled, throwError } from 'rxjs';
import { GUIService } from '../GUI/gui.service';

export abstract class BaseService {

  protected url: string;

  public set config(configs: any) {
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
  public post<T>(body: any = null) {
    body = this.encodeData(body);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const parsedBody = new HttpParams({ fromObject: body });


    return this.http.post(this.url, parsedBody).pipe(
      retryWhen(error => this.reTry(error, 9, 2000)),
      map((dataToMap: any) => dataToMap?.datosCaja ? dataToMap.datosCaja : dataToMap),
      map((dataToCast: any) => dataToCast as T),
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
    const encoded = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = btoa(data[key]);
        encoded[key] = element;
      }
    }
    return encoded;
  }

}
