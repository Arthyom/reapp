import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  infos: any[] = [{ nombre: 'alfredo' }, { nombre: 'alfredo', apellidos: 'gonzale' }];
  constructor() { }

  ngOnInit() {
  }

}
