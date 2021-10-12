import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { slideMessages } from './models/slideMessages';

@Component({
  selector: 'app-passchange',
  templateUrl: './passchange.page.html',
  styleUrls: ['./passchange.page.scss'],
})
export class PasschangePage implements OnInit {

  @ViewChild(IonSlides) statusSlides: IonSlides;

  slideMessages = slideMessages;
  constructor() { }

  ngOnInit() {

  }

  checkStatus(event) {
    if (this.statusSlides) {

      console.log('event', event);
      this.statusSlides.slideTo(event.index);
    }
  }

}
