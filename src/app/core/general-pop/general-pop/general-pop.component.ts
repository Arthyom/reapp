import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ConfigsService } from '../../services/common/configs/configs.service';
import { GUIService } from '../../services/common/GUI/gui.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-general-pop',
  templateUrl: './general-pop.component.html',
  styleUrls: ['./general-pop.component.scss'],
})
export class GeneralPopComponent implements OnInit {
  popRef: HTMLIonPopoverElement;
  private sub: Subject<void>  = new Subject<void>();

  constructor(
    public  popover: PopoverController,
    private config: ConfigsService,
    private gui: GUIService
    ) { }

  ngOnInit() {
    this.sub.asObservable().subscribe( ()=>{
      this.popRef.dismiss();
    });

  }

  async presentPopOver(event) {
    this.gui.showGenericPop({
      component: GeneralPopComponent,
      mode: 'md',
      event,
      backdropDismiss: true,
    });

  }

  async dismis() {
    this.gui.dissmisGenericPop();
  }

  logOut(){
    this.gui.navigateTo('/login');
    this.config.clearConfig();
  }

}
