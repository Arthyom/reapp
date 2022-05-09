import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralPaths } from 'src/app/core/enums/general-paths';
import { ConfigsService } from 'src/app/core/services/common/configs/configs.service';
import { GUIService } from 'src/app/core/services/common/GUI/gui.service';
import { BaseService } from '../../../core/services/common/base/base.service';

import { HTTP } from '@awesome-cordova-plugins/http/ngx';


@Injectable({
  providedIn: 'root'
})
export class TokenServiceService extends BaseService {

  constructor(protected http: HttpClient, protected configs: ConfigsService,
    public guiService: GUIService, public nativeHttp: HTTP) {
    super(http, configs, GeneralPaths.generaToken, guiService, nativeHttp);
  }
}
