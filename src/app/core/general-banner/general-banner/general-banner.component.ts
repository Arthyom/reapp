import { Component, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GeneralPopComponent } from '../../general-pop/general-pop/general-pop.component';
import { ConfigsService } from '../../services/common/configs/configs.service';

@Component({
  selector: 'app-general-banner',
  templateUrl: './general-banner.component.html',
  styleUrls: ['./general-banner.component.scss'],
  providers: [GeneralPopComponent]
})
export class GeneralBannerComponent implements OnInit {

  public get userName(): string {
    return this.configService?.activeUser?.nombre || 'alfredo gonzalez gavina';
  }

  popRef: HTMLIonPopoverElement;
  constructor(
    private configService: ConfigsService,
    public popover: PopoverController,
    private popComp: GeneralPopComponent) { }

  ngOnInit() {

  }



  async presentPopOver(event) {
    this.popComp.presentPopOver(event);
  }



}
