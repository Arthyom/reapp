import { Injectable } from '@angular/core';
import { Usuario } from '../../../../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  decriptedSettings: any;
  encryptedSettings: any = {};

  activeUser: Usuario;

  constructor() { }
}
