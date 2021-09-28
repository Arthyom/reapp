import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { ConfigsService } from '../core/services/common/configs/configs.service';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  infos: any[] = [{ nombre: 'alfredo' }, { nombre: 'alfredo', apellidos: 'gonzale' }];
  constructor(
    protected loginService: LoginService,
    private registerService: RegisterService
  ) { }


  ngOnInit() {

  }

  login() {
    this.loginService.config = { a: 3, b: 3 };

    console.log('fd', this.loginService);

  }





}
