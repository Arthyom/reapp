import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../core/services/common/base/base.service';
import { HttpClient } from '@angular/common/http';
import { GeneralPaths } from '../../core/enums/general-paths';
import { ConfigsService } from '../../core/services/common/configs/configs.service';
import { GUIService } from '../../core/services/common/GUI/gui.service';
import { Usuario } from '../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {



  constructor(protected http: HttpClient, protected configs: ConfigsService, public guiService: GUIService) {
    super(http, configs, GeneralPaths.login, guiService);
  }

  authUser(userToAuth: Usuario) {
    userToAuth = userToAuth?.usuario ? userToAuth.usuario : userToAuth;

    if (userToAuth?.Status === 'Ok') {
      this.activeUser = userToAuth;
      return true;
    }
    else {
      // if the responses does not have 'Status' property
    }
    return false;
  }


}
