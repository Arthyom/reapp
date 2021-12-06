import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { IonSlides } from '@ionic/angular';
import {
  AlertController, AlertOptions, ModalController,
  NavController,
  PopoverController, PopoverOptions, ToastController, ToastOptions
} from '@ionic/angular';

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

  public get genericSource$(): Observable<any> {
    return this.genericSubject.asObservable();
  }
  private genericSubject: Subject<any> = new Subject<any>();

  private generalSlides: IonSlides;

  constructor(

    private alertOnlyButtons: AlertController,
    private customModal: ModalController,
    private customPop: PopoverController,
    private toast: ToastController,
    private router: Router,
    private navCtrl: NavController

  ) { }

  emitGeneral() {
    this.genericSubject.next();
  }

  setSlides( slidesToSet: IonSlides ){
    this.generalSlides = slidesToSet;
  }

  slidesGetIndex(){
   return this.generalSlides.getActiveIndex();
  }

  slidesLock( status: boolean ){
    this.generalSlides.lockSwipes( status );
  }
  slidesSlideTo( index: number ){
    this.generalSlides.slideTo( index );
  }

  slidesUnlockMoveNext(){
    this.generalSlides.lockSwipes( false );
    this.generalSlides.slideNext();
    this.generalSlides.lockSwipes( true );
    this.genericSubject.next(  this.generalSlides.getActiveIndex() );
  }

  slidesUnlockMovePrev(){
    this.generalSlides.lockSwipes( false );
    this.generalSlides.slidePrev();
    this.generalSlides.lockSwipes( true );
    this.genericSubject.next(  this.generalSlides.getActiveIndex() );
  }

  async showGenericPop(modalOptions: PopoverOptions) {
    this.genericPopPresenter = await this.customPop.create(modalOptions);
    this.genericPopPresenter.present();
    return this.genericPopPresenter;
  }

  dissmisGenericPop(){
    this.genericPopPresenter.dismiss();
  }

  async showAlertModalOnlyButtons(alertOptions: AlertOptions) {
    const presenter = await this.alertOnlyButtons.create(alertOptions);
    presenter.present();
  }

  cancelAllLoading() {
    const popCancel = this.genericPopPresenter ? this.genericPopPresenter.dismiss() : null;
  }

  async showToast(options: ToastOptions) {
    const toast = await this.toast.create(options);
    toast.present();
  }

  navigateTo(to: string) {
    this.router.navigateByUrl(to,{replaceUrl: true});
  }


  navBack(){
    this.navCtrl.pop();
  }



}
