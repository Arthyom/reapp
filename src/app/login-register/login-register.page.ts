import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { ConfigsService } from '../core/services/common/configs/configs.service';
import { Usuario } from '../models/usuario';
import { LoadingModalComponent } from '../core/loading-modal/loading-modal/loading-modal.component';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  infos: any[] = [{ nombre: 'alfredo' }, { nombre: 'alfredo', apellidos: 'gonzale' }];
  userToLog: Usuario;
  userToReg: Usuario;
  constructor(
    protected loginService: LoginService,
    private registerService: RegisterService
  ) { }


  ngOnInit() {

  }

  async login() {
    //this.loginService.guiService.showGenericPop({
    //component: LoadingModalComponent
    //});
    try {

      setTimeout(async () => {

        const response = await this.loginService.post<Usuario>(this.userToLog).toPromise();
        console.log('respuesta ', response);
        if (this.loginService.authUser(response)) {
          //this.loginService.guiService.genericPopPresenter.dismiss();
          console.log('correcto adelante');

        } else {
          //this.loginService.guiService.genericPopPresenter.dismiss();
        }
      }, 2000);


    } catch (error) {
      this.loginService.guiService.genericPopPresenter.dismiss();
    }
  }

  async register() {
    try {
      const response = await this.registerService.post<Usuario>(this.userToReg).toPromise();

    } catch (error) { }
  }

}
