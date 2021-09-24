import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-general-pop',
  templateUrl: './general-pop.component.html',
  styleUrls: ['./general-pop.component.scss'],
})
export class GeneralPopComponent implements OnInit {
  popRef: HTMLIonPopoverElement;

  constructor(public popover: PopoverController) { }

  ngOnInit() { }

  async presentPopOver(event) {
    this.popRef = await this.popover.create({
      component: GeneralPopComponent,
      mode: 'md',
      event,
      backdropDismiss: true,
    });
    await this.popRef.present();

  }

  dismis() {
    console.log('e');
  }

}
