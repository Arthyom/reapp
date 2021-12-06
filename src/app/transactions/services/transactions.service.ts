import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralPaths } from 'src/app/core/enums/general-paths';
import { ConfigsService } from 'src/app/core/services/common/configs/configs.service';
import { GUIService } from 'src/app/core/services/common/GUI/gui.service';
import { BaseService } from '../../core/services/common/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends BaseService{

  constructor(protected http: HttpClient, protected configs: ConfigsService, public guiService: GUIService) {
    super(http, configs, GeneralPaths.cambiarClave, guiService);
  }
}
