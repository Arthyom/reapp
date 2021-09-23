import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralListComponent } from './general-list/general-list/general-list.component';
import { GeneralItemComponent } from './general-item/general-item/general-item.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralAuthComponent } from './general-auth/general-auth/general-auth.component';
import { GeneralBannerComponent } from './general-banner/general-banner/general-banner.component';



@NgModule({
  declarations: [GeneralListComponent, GeneralItemComponent, GeneralAuthComponent, GeneralBannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [GeneralListComponent, GeneralItemComponent, GeneralAuthComponent, GeneralBannerComponent]
})
export class CoreModule { }
