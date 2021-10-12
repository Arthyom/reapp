import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { ConfigsService } from '../core/services/common/configs/configs.service';
import { LoadingModalComponent } from '../core/loading-modal/loading-modal/loading-modal.component';
import { UsuarioResponse } from '../core/models/responses/usuarioResponse';
import { UsuarioRequest } from '../core/models/requests/usuarioRequest';
import { RegistrosRequest } from '../core/models/requests/registerRequest';
import { GeneralResponse } from '../core/models/responses/generalResponse';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;
  userToLog: UsuarioRequest = { imei: '1323232', pwd: 'adadada', token: 'fdkfkdkfd', usuario: 'juvencio' };
  userToReg: RegistrosRequest;
  constructor(
    protected loginService: LoginService,
    private registerService: RegisterService
  ) { }


  ngOnInit() {

  }

  login() {
    //this.loginService.guiService.showGenericPop({
    //component: LoadingModalComponent
    //});
    try {

      setTimeout(async () => {

        const response = await this.loginService.post<UsuarioResponse>(this.userToLog).toPromise();
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
      const response = await this.registerService.post<GeneralResponse>(this.userToReg).toPromise();

    } catch (error) { }
  }

}
