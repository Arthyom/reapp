import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { IonIcon, IonInput, Platform } from '@ionic/angular';
import { ConfigsService } from '../../services/common/configs/configs.service';
import { slideMessages } from './models/slideMessages';
import { Device } from '@ionic-native/device/ngx';
import { environment } from '../../../../environments/environment';


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
  imei: string;
  isCordova= false;


  authForm: FormGroup;

  valitorsForRegister = {
    usuario: new FormControl(null,
      [this.validateNotNull.bind(this)
      ]),
    pwd: new FormControl(null, [
      this.validateNotNull.bind(this),
      this.validateLen.bind(this),
    ]),
    telefono: new FormControl(null, [
      Validators.required,
      this.validateNotNull.bind(this),
    ]),
    nwpwd: new FormControl()
  };

  valitorsForLogin = {
    usuario: new FormControl(null,
      [this.validateNotNull.bind(this)
      ]),
    pwd: new FormControl(null, [
      this.validateNotNull.bind(this),
      this.validateLen.bind(this),
      this.validatePassIdentity.bind(this),
    ]),
    nwpwd: new FormControl()
  };

  valitorsForValid = {
    usuario: new FormControl(null,
      [this.validateNotNull.bind(this)
      ]),
    pwd: new FormControl(null, [
      this.validateNotNull.bind(this),
      //this.validateLen.bind(this),
    ]),
    nwpwd: new FormControl()
  };

  valitorsForChange = {
    usuario: new FormControl(),
    pwd: new FormControl(null, [
      this.validateNotNull.bind(this),
      this.validateLen.bind(this),
      this.validatePassIdentity.bind(this),
      this.validateConfirmPass.bind(this)
    ]),
    nwpwd: new FormControl(
      null, [
      this.validateNotNull.bind(this),
      this.validateLen.bind(this),
      this.validatePassIdentity.bind(this),
      this.validateConfirmPass.bind(this)
    ])
  };

  constructor(
    private config: ConfigsService,
    private device: Device,
    private platform: Platform
  ) {

  }

  ngOnInit() {

    const v = this.chekValidatorsType();
    this.authForm = new FormGroup(v);
    this.authForm.valueChanges.subscribe((dara) => {
      this.formIsValid();
    });

    if( this.platform.is('cordova') ){
      this.isCordova  = true;
     this.imei = this.device.uuid;
    }
    else{
      this.imei = environment.imei;
    }


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
    if (this.config.decriptedSettings.pwd === control.value) {
      this.stEmit.emit(slideMessages.errIdentic);
      return { valid: false };
    }
  }

  validateLen(control: AbstractControl): ValidationErrors {
    if (control.value?.length < this.minLen && control.value?.length > 0) {
      this.stEmit.emit(slideMessages.errLen);
      return { valid: false };
    }
  }

  validateNotNull(control: AbstractControl): ValidationErrors {
    if (control.value?.length === 0 || control.value === null) {
      this.stEmit.emit(slideMessages.errNull);
      return { valid: false };
    }
  }

  validateConfirmPass(control: AbstractControl): ValidationErrors {

    const conf: string = this.authForm?.get('nwpwd')?.value;
    const pwd: string = this.authForm?.get('pwd')?.value;

    if (conf?.length >= this.minLen && pwd?.length >= this.minLen) {
      if (conf !== pwd) {
        this.stEmit.emit(slideMessages.errMatch);
        return { valid: false };
      }
      else {
        if (conf !== this.config.decriptedSettings.pwd) {

          this.stEmit.emit(slideMessages.acceptable);
          return null;
        }
        //return { valid: true };
      }
    }
  }

  formIsValid() {
    if (this.authForm.valid) {
      //this.stEmit.emit(dataEmitters.ok);
    }
  }

  emitOK() {
    const vals: any = {};
    for (const key in this.authForm.controls) {
      if (Object.prototype.hasOwnProperty.call(this.authForm.controls, key)) {
        vals[key] = this.authForm.controls[key].value;
      }
    }
    vals.token = environment.token;
    vals.imei = this.imei;
    this.okEmit.emit(vals);
  }
}
