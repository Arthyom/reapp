import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralPaths } from '../../core/general-paths';
import { BaseService } from '../../core/services/common/base/base.service';
import { ConfigsService } from '../../core/services/common/configs/configs.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService {

  constructor(protected http: HttpClient, protected configs: ConfigsService) {
    super(http, configs, GeneralPaths.register);
  }
}
