import { inject, Injectable } from '@angular/core';
import { BaseService } from '../../core/services/common/base/base.service';
import { HttpClient } from '@angular/common/http';
import { GeneralPaths } from '../../core/general-paths';
import { ConfigsService } from '../../core/services/common/configs/configs.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {



  constructor(protected http: HttpClient, protected configs: ConfigsService) {
    super(http, configs, GeneralPaths.login);
  }


}
