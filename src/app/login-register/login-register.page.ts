import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  infos: any[] = [{ nombre: 'alfredo' }, { nombre: 'alfredo', apellidos: 'gonzale' }];
  constructor() { }


  ngOnInit() {

  }





}
