import { Component, OnDestroy, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { UsuarioResponse } from '../core/models/responses/usuarioResponse';
import { UsuarioRequest } from '../core/models/requests/usuarioRequest';
import { RegistrosRequest } from '../core/models/requests/registerRequest';
import { GeneralResponse } from '../core/models/responses/generalResponse';
import { GeneralAuthComponent } from '../core/general-auth/general-auth/general-auth.component';
import { loginErrorOption } from '../core/data/toastOptions';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements AfterViewInit {

  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChildren(GeneralAuthComponent) foms: QueryList<GeneralAuthComponent>;

  userToReg: RegistrosRequest;

  constructor(
    protected loginService: LoginService,
    private registerService: RegisterService
  ) { }

  ngAfterViewInit(): void {
    this.slides.lockSwipes(true);
  }

  async login(event: UsuarioRequest) {

    try {
      const response = await this.loginService.post<UsuarioResponse>(event).toPromise();
      console.log('dsdsd', response);
      if (this.loginService.authUser(response, event)) {
        return this.loginService.guiService.navigateTo('/home');
      }
    } catch (error) {
      this.loginService.guiService.showToast(loginErrorOption);
    }
  }

  async register(event) {
    try {
      const response = await this.registerService.
        post<GeneralResponse>(event).toPromise();
      this.cancel();
    } catch (error) { }
  }

  cancel() {
    this.foms.forEach((form) => form.authForm.reset());
    this.unlockAndPrev();
  }

  unlockAndPrev() {
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  unlockAndNext() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

}
