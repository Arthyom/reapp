import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralTransTypes } from '../core/enums/general-trans-types';
import { TransactionsService } from './services/transactions.service';
import { GeneralResponse } from '../core/models/responses/generalResponse';
import { GeneralPaths } from '../core/enums/general-paths';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  transType: string;
  transTypes = GeneralTransTypes;
  item: any;
  currentIndex = 0;
  constructor(
    private activatedRouter: ActivatedRoute,
    private transService: TransactionsService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.item = this.router.getCurrentNavigation().extras.state.info;
    this.transType = this.activatedRouter.snapshot.paramMap.get('type');
    this.transService.guiService.genericSource$.subscribe( async (data)=>{
      this.currentIndex = await data;
    });
  }

  goTo( to: string ){
    this.transService.guiService.navigateTo(to);
  }



  async esuchar(event) {
    let serviceTarget: string;
    switch (event.transType) {
      case GeneralTransTypes.transferir: serviceTarget = GeneralPaths.aplicarTransferencia; break;
      case GeneralTransTypes.abonar: serviceTarget = GeneralPaths.aplicarAbono; break;
      case GeneralTransTypes.traspasos: serviceTarget = GeneralPaths.aplicarTraspaso; break;
      case GeneralTransTypes.spei: serviceTarget = GeneralPaths.spei; break;
    }

    const resp = await this.transService.post<GeneralResponse>(event, serviceTarget).toPromise();
    console.log('respues', resp);
    this.transService.guiService.navigateTo('/home');
    if(resp.respuesta.toLowerCase() === 'ok'){
      this.transService.guiService.showToast({
        message: `Correcto tu folio es ${resp.registro}`,
        color: 'success',
        duration: 9000
      });

    }
    else{
      this.transService.guiService.showToast({
        message: 'correcto',
        color: 'danger',
        duration: 5000
      });
    }
  }

}
