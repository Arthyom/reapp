import { Injectable } from '@angular/core';
import { AlertButton, AlertController, AlertOptions, ModalController, PopoverController, PopoverOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GUIService {

  alertServerError: AlertOptions = {
    header: 'ere',
    subHeader: '3434',
    message: 'sfsfs"',
    backdropDismiss: false,
    buttons: [
      {
        text: 'Salir',
        role: 'cancel'
      },
      {
        text: 'Continuar',
        role: 'ok'
      }
    ]
  };
  genericPopPresenter: HTMLIonPopoverElement;
  constructor(

    private alertOnlyButtons: AlertController,
    private customModal: ModalController,
    private customPop: PopoverController

  ) { }

  async showGenericPop(modalOptions: PopoverOptions) {
    this.genericPopPresenter = await this.customPop.create(modalOptions);
    this.genericPopPresenter.present();
    return this.genericPopPresenter;
  }

  async showAlertModalOnlyButtons(alertOptions: AlertOptions) {
    const presenter = await this.alertOnlyButtons.create(alertOptions);
    presenter.present();
  }

  cancelAllLoading() {
    const popCancel = this.genericPopPresenter ? this.genericPopPresenter.dismiss() : null;
  }
}
