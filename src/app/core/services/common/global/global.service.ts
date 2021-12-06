import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralPaths } from 'src/app/core/enums/general-paths';
import { BaseService } from '../base/base.service';
import { ConfigsService } from '../configs/configs.service';
import { GUIService } from '../GUI/gui.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService extends BaseService {

  constructor(protected http: HttpClient, protected configs: ConfigsService,
    public guiService: GUIService) {
    super(http, configs, GeneralPaths.generaToken, guiService);
  }



}
