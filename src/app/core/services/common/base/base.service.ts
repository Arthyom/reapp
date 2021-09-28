import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigsService } from '../configs/configs.service';


export abstract class BaseService {

  protected url: string;

  public set config(configs: any) {
    this.settings.decriptedSettings = configs;
    for (const key in configs) {
      if (Object.prototype.hasOwnProperty.call(configs, key)) {
        const element = btoa(configs[key]);
        this.settings.encryptedSettings[key] = element;
      }
    }
  }

  /**
   * Use the base service to create your services
   *
   * @param http      Angular http cliente service
   * @param settings  Application settings
   * @param resource  Target service to send a request
   */
  constructor(protected readonly http: HttpClient, protected settings: ConfigsService, resource: string) {
    this.url = `${environment.baseUrl}/${resource}`;
  }

  /**
   * Triggers a HTTP request by GET Method. It needs improve  value types
   *
   * @param params [params] Any data to be sent to the server
   */
  public get(params: HttpParams | { [param: string]: string | string[] }) {

  }


  /**
   *Triggers a HTTP request by POST Method. It needs improve  value types
   *
   * @param data [data] Any data to be sent to the server
   */
  public post(data: any = null) {
    return this.http.post(this.url, data);
  }

}
