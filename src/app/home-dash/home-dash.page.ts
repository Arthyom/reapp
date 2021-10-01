import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { HomeDashServicesService } from './services/homeDashServices/home-dash-services.service';
import { ConfigsService } from '../core/services/common/configs/configs.service';
import { loadingController } from '@ionic/core';
import { LoadingModalComponent } from '../core/loading-modal/loading-modal/loading-modal.component';

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.page.html',
  styleUrls: ['./home-dash.page.scss'],
})
export class HomeDashPage implements OnInit {

  @ViewChild(IonSlides) mainSlides: IonSlides;
  items: any = [
    { nombre: 'alfredo' }, { nombre: 'alfredo', apellido: 'gonzalez' },
    { nombre: 'alfredo' }, { nombre: 'alfredo', apellido: 'gonzalez' },
    { nombre: 'alfredo' }, { nombre: 'alfredo', apellido: 'gonzalez' }

  ];


  constructor(protected homeService: HomeDashServicesService) { }

  ngOnInit() {

    this.homeService.guiService.showGenericPop({
      component: LoadingModalComponent
    });
    this.homeService.post({}).subscribe(() => {
      setTimeout(() => {
        this.homeService.guiService.genericPopPresenter.dismiss();
      });








    });
  }

  moveTo(index: number) {
    this.mainSlides.slideTo(index);
  }

}
