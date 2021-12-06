import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from './service/contacts.service';
import { GeneralResponse } from '../core/models/responses/generalResponse';
import { IonSlides } from '@ionic/angular';
import { GeneralPaths } from '../core/enums/general-paths';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit, AfterViewInit {

  @ViewChild(IonSlides) slides: IonSlides;
  formAddContact: FormGroup;
  items: any[] = [];


  validatos = {
    sociodestino: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    cuentadestino: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    nombre: new FormControl(null, [Validators.required, Validators.minLength(4)] )
  };

  constructor(
    private regCont: ContactsService
  ) {
    this.formAddContact = new FormGroup(this.validatos);
  }

  async ngOnInit() {
    this.items = await this.regCont.post<any[]>(  this.formAddContact.value , GeneralPaths.saldosDisponibles ).toPromise();

  }

  ngAfterViewInit(): void {
    this.regCont.guiService.setSlides(this.slides);
  }

  slideNext(){
    this.regCont.guiService.slidesUnlockMoveNext();
  }

  slidePrev(){
    this.regCont.guiService.slidesUnlockMovePrev();
  }

  cancel(){
    this.regCont.guiService.navBack();
  }

  async crearContacto(){
    const values = this.formAddContact.value;

    const respuesta = await this.regCont.post<GeneralResponse>( values, GeneralPaths.registrarContacto).toPromise();
    if( respuesta.respuesta !== '0' ){
      this.regCont.guiService.showToast({message:'correcto', color:'primary', duration:3000});
    }
    else{
      this.regCont.guiService.showToast({message:'correcto', color:'danger', duration:3000});


    }
    this.regCont.guiService.emitGeneral();
    return this.regCont.guiService.navBack();
  }

  async getAccounts(){
    this.items = await this.regCont.post<any[]>(  this.formAddContact.value , GeneralPaths.saldosDisponibles ).toPromise();
    this.slideNext();
  }

  setFromAccount(data){
    this.formAddContact.setControl('cuentadestino',
      new FormControl( data.cuenta, [Validators.required, Validators.minLength(4)])
    );
    setTimeout(() => {
      this.slideNext();
    }, 500);
  }

}
