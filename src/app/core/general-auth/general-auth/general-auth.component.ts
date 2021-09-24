import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonIcon, IonInput } from '@ionic/angular';

@Component({
  selector: 'app-general-auth',
  templateUrl: './general-auth.component.html',
  styleUrls: ['./general-auth.component.scss'],
})
export class GeneralAuthComponent implements OnInit {

  @Input() imei = false;
  @Input() cancel = false;

  @Output() okEmit = new EventEmitter();
  @Output() clEmit = new EventEmitter();
  @Output() bkEmit = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  changePass(passIcon: IonIcon, passInput: IonInput) {
    if (passInput.type === 'password') {
      passIcon.name = 'eye-off';
      passInput.type = 'text';
    }
    else {
      passIcon.name = 'eye';
      passInput.type = 'password';
    }
  }

}
