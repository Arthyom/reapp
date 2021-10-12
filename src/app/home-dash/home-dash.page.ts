import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { HomeDashServicesService } from './services/homeDashServices/home-dash-services.service';
import { ConfigsService } from '../core/services/common/configs/configs.service';
import { loadingController } from '@ionic/core';
import { LoadingModalComponent } from '../core/loading-modal/loading-modal/loading-modal.component';
import { buttonToolbarHeaders } from './menubar/menubar/models/buttonToolbarHeader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.page.html',
  styleUrls: ['./home-dash.page.scss'],
})
export class HomeDashPage implements OnInit {

  @ViewChild(IonSlides) mainSlides: IonSlides;
  items: any[];
  slides = buttonToolbarHeaders;


  constructor(
    protected homeService: HomeDashServicesService,
    private router: Router
  ) { }

  ngOnInit() {

    this.homeService.guiService.showGenericPop({
      component: LoadingModalComponent
    });
    this.homeService.post({}).subscribe(() => {
      setTimeout(() => {
        this.homeService.guiService.genericPopPresenter.dismiss();
      });








    });
  }

  async moveTo(buttonInfo: any) {
    this.mainSlides.slideTo(buttonInfo.index);
    this.items = await this.homeService.post<any[]>({}, buttonInfo.target).toPromise();
  }

  detailsOf(item: any) {
    this.router.navigate(['transactions']);
    console.log('ir a la pagina de carga');
  }

}
