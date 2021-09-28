import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/common/base/base.service';
import { HttpClient } from '@angular/common/http';
import { ConfigsService } from '../../../core/services/common/configs/configs.service';
import { GeneralPaths } from '../../../core/general-paths';

@Injectable({
  providedIn: 'root'
})
export class HomeDashServicesService extends BaseService {

  constructor(protected http: HttpClient, protected configs: ConfigsService) {
    super(http, configs, GeneralPaths.listdeb);
  }
}
