import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralPaths } from '../../core/enums/general-paths';
import { BaseService } from '../../core/services/common/base/base.service';
import { ConfigsService } from '../../core/services/common/configs/configs.service';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { GUIService } from 'src/app/core/services/common/GUI/gui.service';


@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService {

  constructor(protected http: HttpClient, protected configs: ConfigsService, public guiService: GUIService, public nativeHttp: HTTP) {
    super(http, configs, GeneralPaths.cambiarClave, guiService, nativeHttp);
  }
}
