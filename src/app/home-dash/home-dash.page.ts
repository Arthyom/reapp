import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { HomeDashServicesService } from './services/homeDashServices/home-dash-services.service';
import { ConfigsService } from '../core/services/common/configs/configs.service';

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
    console.log('my servicio', this.homeService.config);
  }

  moveTo(index: number) {
    this.mainSlides.slideTo(index);
  }

}
