import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../core/services/common/base/base.service';
import { HttpClient } from '@angular/common/http';
import { GeneralPaths } from '../../core/enums/general-paths';
import { ConfigsService } from '../../core/services/common/configs/configs.service';
import { GUIService } from '../../core/services/common/GUI/gui.service';
import { UsuarioResponse } from '../../core/models/responses/usuarioResponse';
import { UsuarioRequest } from '../../core/models/requests/usuarioRequest';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {



  constructor(protected http: HttpClient, protected configs: ConfigsService, public guiService: GUIService, public nativeHttp: HTTP) {
    super(http, configs, GeneralPaths.login, guiService, nativeHttp);
  }

  authUser(userToAuth: UsuarioResponse, userToLogin: UsuarioRequest) {
    userToAuth = userToAuth?.usuario ? userToAuth.usuario : userToAuth;

    if (userToAuth || userToAuth?.status === 'Ok') {
      // set active user and applies auth rules to change some properties
      this.configs.activeUser = userToAuth;
      this.configs.decriptedSettings = { ...userToLogin, ...userToAuth };
      return true;
    }
    else {
      // if the responses does not have 'Status' property
    }
    return false;
  }

  compareCredentials(credentialToCompare: any) {
    const user = credentialToCompare.usuario === this.configs.decriptedSettings.usuario;
    const pwd = credentialToCompare.pwd === this.configs.decriptedSettings.pwd;

    return pwd && user ? true : false;
  }

  //


}
