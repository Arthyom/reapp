import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/common/base/base.service';
import { HttpClient } from '@angular/common/http';
import { ConfigsService } from '../../../core/services/common/configs/configs.service';
import { GeneralPaths } from '../../../core/enums/general-paths';
import { GUIService } from '../../../core/services/common/GUI/gui.service';


import { HTTP } from '@awesome-cordova-plugins/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class HomeDashServicesService extends BaseService {

  constructor(protected http: HttpClient, protected configs: ConfigsService,
    public guiService: GUIService, public nativeHttp: HTTP) {
    super(http, configs, GeneralPaths.generaToken, guiService, nativeHttp);
  }


  public get decConfs(): any {
    return this.configs.decriptedSettings;
  }



}
