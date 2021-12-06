import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovimientosService } from './services/movimientos.service';
import { LoadingModalComponent } from '../core/loading-modal/loading-modal/loading-modal.component';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.page.html',
  styleUrls: ['./movimientos.page.scss'],
})
export class MovimientosPage implements OnInit {

  item: any = {};
  periodo = 1;
  tipo = '';
  items: any[] = [];
  body: any;
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private movService: MovimientosService
  ) { }

  async ngOnInit() {
    this.item = this.router.getCurrentNavigation().extras.state.info;
    this.getMovements();

  }

  async getMovements() {

    const modal = await this.movService.guiService.showGenericPop({
      component:
      LoadingModalComponent
     });
     this.body = { cuenta: this.item.cuenta, periodo: this.periodo, tipo: this.tipo };


     try {

      console.log('dvv', this.body);
       this.items = [];
       this.items = await this.movService.post<any[]>(this.body).toPromise();

       modal.dismiss();
     } catch (error) {
      modal.dismiss();

     }

  }

}
