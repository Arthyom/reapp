import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

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
  constructor() { }

  ngOnInit() {
  }

  moveTo(index: number) {
    this.mainSlides.slideTo(index);
  }

}
