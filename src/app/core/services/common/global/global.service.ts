import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralPaths } from 'src/app/core/enums/general-paths';
import { BaseService } from '../base/base.service';
import { ConfigsService } from '../configs/configs.service';
import { GUIService } from '../GUI/gui.service';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class GlobalService extends BaseService {

  constructor(protected http: HttpClient, protected configs: ConfigsService,
    public guiService: GUIService, public nativeHttp: HTTP) {
    super(http, configs, GeneralPaths.generaToken, guiService, nativeHttp);
  }



}
