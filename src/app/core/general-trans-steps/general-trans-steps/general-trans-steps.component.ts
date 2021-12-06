import { Component, Input, OnInit, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { GlobalService } from '../../services/common/global/global.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralPaths } from '../../enums/general-paths';
import { GeneralTransTypes } from '../../enums/general-trans-types';
import { IonSlide, IonSlides, ToastOptions } from '@ionic/angular';


@Component({
  selector: 'app-general-trans-steps',
  templateUrl: './general-trans-steps.component.html',
  styleUrls: ['./general-trans-steps.component.scss'],
})
export class GeneralTransStepsComponent implements OnInit, AfterViewInit {

  @Input() selected: any = {};
  @Input() transType: string;
  @Output() transEmit: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(IonSlides) slides: IonSlides;


  nuevoContacto = false;
  items: any[] = [];
  transForm: FormGroup;
  transTypes = GeneralTransTypes;
  selectedTarget: any;

  opt = {slidesPerView: 1};

  valsForTrans: any;

  valsForTransSocio: any;

  constructor(private global: GlobalService) {

  }

  async ngOnInit() {


    this.valsForTrans = {
      cuentadestino: new FormControl(null, [Validators.required]),

      montotranspaso: new FormControl(null, [Validators.required,
        Validators.min(0.1),

        Validators.max(this.selected?.disponible || this.selected?.disponible)]),
    };

    this.valsForTransSocio = {
      sociodestino:new FormControl(null, [Validators.required]),
      cuentadestino: new FormControl(null, [Validators.required]),
      montotranspaso: new FormControl(null, [Validators.required,
        Validators.min(0.1),
         Validators.max(this.selected?.disponible || this.selected?.disponible)]),
      concepto: new FormControl( null,[Validators.required])
    };


    if(this.transType === 'traspasos'){
      this.transForm = new FormGroup(this.valsForTransSocio);
      this.items = await this.global.post<any[]>( this.global.configsBase, GeneralPaths.saldosDisponibles).toPromise();

      this.getTransTo();
    }
    else{
      this.transForm = new FormGroup(this.valsForTrans);
    }
    this.global.guiService.genericSource$.subscribe( ()=>{
      this.getTransTo();
    });


  }

  async getTransTo(){
    if( this.transType === this.transTypes.traspasos ){
      const t = await this.global.post<any[]> ( this.global.configsBase, GeneralPaths.cuentasRegistradas )
      .toPromise();
      this.items = t.reverse();
    }
  }

  ngAfterViewInit(): void {
    this.global.guiService.setSlides(this.slides);
    this.slideShowIns();
  }

  slideNext(){
    this.global.guiService.slidesUnlockMoveNext();
    this.slideShowIns();

  }

  slidePrev(){
    this.global.guiService.slidesUnlockMovePrev();
    this.slideShowIns();
  }

  async slideShowIns(){
    const index = await this.global.guiService.slidesGetIndex();
    let options: ToastOptions = {duration: 2000, color: 'warning', animated: true,
    message: 'Selecciona cuenta de destino', buttons: ['Ok'] };

    if( (this.transType === this.transTypes.traspasos) && (index === 0)  ){
      switch (index) {
        case 0:
          options = {duration: 2000, color: 'warning', animated: true,
          message: 'Selecciona un socio o crea uno nuevo', buttons: ['Ok'] };
        break;

      }
    }
    if( index === 0 ){
      this.global.guiService.showToast( options );
    }

  }

  press(event) {
    console.log('sdsss ', event);
  }

  execute() {
    this.transForm.value.transType = this.transType;
    this.transForm.value.fechahora = '27/10/2021';
    this.transForm.value.cuentafuente = this.selected.cuenta;
    this.transForm.value.folio = '';
    this.transForm.value.coordenadas = '';

    if(this.transType === this.transTypes.traspasos){
      this.transForm.value.sociodestino =  this.transForm.value.idPersona;
      this.transForm.value.cuentafuente = this.selected.cuenta;
    }


    this.transEmit.emit(this.transForm.value);
  }

  setFromAccount(event) {
    console.log('event',     this.global.configsBase   );
    this.slideNext();
    this.transForm.setControl('cuentafuente', new FormControl( this.selected.cuenta, [Validators.required]));
    this.transForm.setControl('sociodestino', new FormControl( event.socio, [Validators.required]));

    this.transForm.setControl('cuentadestino', new FormControl(event.cuenta, [Validators.required]));
  }

}
