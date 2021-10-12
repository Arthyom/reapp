import { Injectable } from '@angular/core';
import { UsuarioResponse } from '../../../models/responses/usuarioResponse';
import { RequestGeneralConfs } from '../../../models/configs/requestGeneralConfs';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  decriptedSettings: RequestGeneralConfs = { pwd: '12345678', token: 'asdsd', usuario: 'ju' };
  encryptedSettings: RequestGeneralConfs;

  activeUser: UsuarioResponse;

  constructor() { }
}
