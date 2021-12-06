import { Injectable, OnInit } from '@angular/core';
import { UsuarioResponse } from '../../../models/responses/usuarioResponse';
import { RequestGeneralConfs } from '../../../models/configs/requestGeneralConfs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService  {

  decriptedSettings: RequestGeneralConfs;
  encryptedSettings: RequestGeneralConfs;
  activeUser: UsuarioResponse;



  constructor() {
    this.initService();
   }

  initService(){
    this.decriptedSettings = {
      token: environment.token , imei: environment.imei
    };
  }


  clearConfig(){
    this.activeUser = null;
    this.encryptedSettings = {};
    this.decriptedSettings = {};
  }

}
