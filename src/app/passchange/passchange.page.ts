import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { PasschangeService } from './services/passchange.service';
import { LoginService } from '../login-register/services/login.service';
import { slideMessages } from '../core/general-auth/general-auth/models/slideMessages';
import { GeneralResponse } from '../core/models/responses/generalResponse';
import { GeneralPaths } from '../core/enums/general-paths';

@Component({
  selector: 'app-passchange',
  templateUrl: './passchange.page.html',
  styleUrls: ['./passchange.page.scss'],
})
export class PasschangePage implements OnInit {

  @ViewChild(IonSlides) statusSlides: IonSlides;
  @ViewChild('slideForms') formsSlides: IonSlides;


  slideMessages = slideMessages;
  constructor(
    private changeService: PasschangeService,
    private loginService: LoginService
  ) { }

  ngOnInit() {

  }

  parseObject(slidesObject) {
    const slides: any[] = [];
    for (const key in slidesObject) {
      if (Object.prototype.hasOwnProperty.call(slidesObject, key)) {
        slides.push(slidesObject[key]);
      }
    }
    return slides;
  }

  checkLoged(event) {
    if (this.statusSlides) {
      if (this.loginService.compareCredentials(event)) {
        this.statusSlides.slideNext();
        this.formsSlides.slideNext();
      }
    }
  }

  async changPwd(event) {
    const response = await this.changeService.post<GeneralResponse>(event, GeneralPaths.cambiarClave, false).toPromise();
    this.changeService.guiService.showToast({ duration: 5000, message: 'ok' });
    this.changeService.guiService.navigateTo('home');
  }

  checkStatus(event) {
    if (this.statusSlides) {
      this.statusSlides.slideTo(event.index);
    }
  }



}
