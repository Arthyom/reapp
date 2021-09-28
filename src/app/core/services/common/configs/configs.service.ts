import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigsService {

  decriptedSettings: any;
  encryptedSettings: any = {};

  constructor() { }
}
