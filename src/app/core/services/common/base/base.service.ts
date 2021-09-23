import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export abstract class BaseService {

  protected url: string;

  /**
   * Use the base service to create your services
   *
   * @param http      Angular http cliente service
   * @param settings  Application settings
   * @param resource  Target service to send a request
   */
  constructor(protected readonly http: HttpClient, protected settings: any, resource: string) {
    this.url = `${environment.baseUrl}/${resource}`;
  }

  /**
   * Triggers a HTTP request by GET Method. It needs improve  value types
   *
   * @param params [params] Any data to be sent to the server
   */
  protected get(params: HttpParams | { [param: string]: string | string[] }) {

  }


  /**
   *Triggers a HTTP request by POST Method. It needs improve  value types
   *
   * @param data [data] Any data to be sent to the server
   */
  protected post(data: any = null) {
    return this.http.post(this.url, data);
  }

}
