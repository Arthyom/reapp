import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IonIcon, IonInput } from '@ionic/angular';
import { ConfigsService } from '../../services/common/configs/configs.service';
import { dataEmitters } from './models/dataEmitters';

@Component({
  selector: 'app-general-auth',
  templateUrl: './general-auth.component.html',
  styleUrls: ['./general-auth.component.scss'],
})
export class GeneralAuthComponent implements OnInit {

  @Input() cancel = false;
  @Input() chkLeng = false;

  @Input() showChangeForm = false;
  @Input() showLoginForm = false;
  @Input() showRegisForm = false;
  @Input() showValidForm = false;


  @Output() okEmit = new EventEmitter();
  @Output() clEmit = new EventEmitter();
  @Output() bkEmit = new EventEmitter();
  @Output() stEmit: EventEmitter<any> = new EventEmitter<any>();
  minLen = 8;
  debounce = 0;
  generalAuthOject = { opass: '12345678', pass: '', email: '', user: '', imei: '' };


  authForm: FormGroup;

  valitorsForRegister = {
    usuario: new FormControl(null,
      [this.validateNotNull.bind(this)
      ]),
    pass: new FormControl(null, [
      this.validateNotNull.bind(this),
      this.validateLen.bind(this),
    ]),
    telefono: new FormControl(null, [this.validateNotNull.bind(this),
    ]),
    conf: new FormControl()
  };

  valitorsForLogin = {
    usuario: new FormControl(null,
      [this.validateNotNull.bind(this)
      ]),
    pass: new FormControl(null, [
      this.validateNotNull.bind(this),
      this.validateLen.bind(this),
      this.validatePassIdentity.bind(this),
    ]),
    conf: new FormControl()
  };

  valitorsForValid = {
    usuario: new FormControl(null,
      [this.validateNotNull.bind(this)
      ]),
    pass: new FormControl(null, [
      this.validateNotNull.bind(this),
      this.validateLen.bind(this),
    ]),
    conf: new FormControl()
  };

  valitorsForChange = {
    usuario: new FormControl(),
    pass: new FormControl(null, [
      this.validateNotNull.bind(this),
      this.validateLen.bind(this),
      this.validatePassIdentity.bind(this),
      this.validateConfirmPass.bind(this)
    ]),
    conf: new FormControl(
      null, [
      this.validateNotNull.bind(this),
      this.validateLen.bind(this),
      this.validatePassIdentity.bind(this),
      this.validateConfirmPass.bind(this)
    ])
  };

  constructor(
    private config: ConfigsService
  ) {

  }

  ngOnInit() {
    const v = this.chekValidatorsType();
    console.log('valsss ', v);
    this.authForm = new FormGroup(v);
    this.authForm.valueChanges.subscribe((dara) => {
      this.formIsValid();
    });
  }

  chekValidatorsType() {
    if (this.showChangeForm) { return this.valitorsForChange; }
    if (this.showLoginForm) { return this.valitorsForLogin; }
    if (this.showRegisForm) { return this.valitorsForRegister; }
    if (this.showValidForm) { return this.valitorsForValid; }
  }

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

  validatePassIdentity(control: AbstractControl): ValidationErrors {
    if (this.generalAuthOject.opass === control.value) {
      this.stEmit.emit(dataEmitters.lastEqual);
      return { valid: false };
    }
  }

  validateLen(control: AbstractControl): ValidationErrors {
    if (control.value?.length < this.minLen && control.value?.length > 0) {
      this.stEmit.emit(dataEmitters.minLen);
      return { valid: false };
    }
  }

  validateNotNull(control: AbstractControl): ValidationErrors {
    if (control.value?.length === 0 || control.value === null) {
      this.stEmit.emit(dataEmitters.null);
      return { valid: false };
    }
  }

  validateConfirmPass(control: AbstractControl): ValidationErrors {
    const conf: string = this.authForm?.get('conf')?.value;
    const pass: string = this.authForm?.get('pass')?.value;

    if (conf?.length >= this.minLen && pass?.length >= this.minLen) {
      if (conf !== pass) {
        this.stEmit.emit(dataEmitters.coincide);
        return { valid: false };
      }
    }
  }

  formIsValid() {
    if (this.authForm.valid) {
      this.stEmit.emit(dataEmitters.ok);
    }
  }



}
