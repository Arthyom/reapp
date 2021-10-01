import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/services/common/base/base.service';
import { HttpClient } from '@angular/common/http';
import { ConfigsService } from '../../../core/services/common/configs/configs.service';
import { GeneralPaths } from '../../../core/enums/general-paths';
import { GUIService } from '../../../core/services/common/GUI/gui.service';

@Injectable({
  providedIn: 'root'
})
export class HomeDashServicesService extends BaseService {

  constructor(protected http: HttpClient, protected configs: ConfigsService,
    public guiService: GUIService) {
    super(http, configs, GeneralPaths.generaToken, guiService);
  }
}
