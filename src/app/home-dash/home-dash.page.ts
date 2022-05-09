import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { HomeDashServicesService } from './services/homeDashServices/home-dash-services.service';
import { ConfigsService } from '../core/services/common/configs/configs.service';
import { loadingController } from '@ionic/core';
import { LoadingModalComponent } from '../core/loading-modal/loading-modal/loading-modal.component';
import { buttonToolbarHeaders } from './menubar/menubar/models/buttonToolbarHeader';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.page.html',
  styleUrls: ['./home-dash.page.scss'],
})
export class HomeDashPage implements OnInit, AfterViewInit {

  @ViewChild(IonSlides) mainSlides: IonSlides;
  items: any[] = [];
  slides = buttonToolbarHeaders;
  transType: string;
  len: number[] = [];


  constructor(
    protected homeService: HomeDashServicesService,
    private router: Router
  ) { }

  async ngOnInit() {


    const s = await this.homeService.guiService.showGenericPop({
      component: LoadingModalComponent,
      backdropDismiss: false
    });


    buttonToolbarHeaders.sort((a, b) => a.index - b.index).forEach(async (buttonInfo) => {
      let r = await this.homeService.post<any[]>(this.homeService.decConfs, buttonInfo.target).toPromise();
      r = r.length ? r : [r];
      this.len[buttonInfo.index] = r.length;
      if (this.len.length === buttonToolbarHeaders.length) {
        s.dismiss();
      }
    });

  }

  ngAfterViewInit(): void {
    //this.moveTo(buttonToolbarHeaders[0]);
    //this.mainSlides.lockSwipes(true);

  }

  async moveTo(buttonInfo: any) {
    this.transType = buttonInfo.title.toString().toLowerCase();
    this.mainSlides.lockSwipes(false);
    this.mainSlides.slideTo(buttonInfo.index);
    this.mainSlides.lockSwipes(true);
    this.homeService.post<any[]>(this.homeService.decConfs, buttonInfo.target)
      .pipe(map(data => data.length > 0 ? data : [data]))
      .subscribe((data) => this.items = data);
  }

  detailsOf(item: any) {
    this.router.navigate(['transactions', this.transType], { state: { info: item } });
  }

  showMovements(item: any) {
    this.router.navigateByUrl('movimientos', { state: { info: item } });
  }

}
