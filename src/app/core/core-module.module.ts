import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralListComponent } from './general-list/general-list/general-list.component';
import { GeneralItemComponent } from './general-item/general-item/general-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralAuthComponent } from './general-auth/general-auth/general-auth.component';
import { GeneralBannerComponent } from './general-banner/general-banner/general-banner.component';
import { GeneralPopComponent } from './general-pop/general-pop/general-pop.component';
import { RouterModule } from '@angular/router';
import { ConfigsService } from './services/common/configs/configs.service';
import { LoadingModalComponent } from './loading-modal/loading-modal/loading-modal.component';
import { GeneralContactsComponent } from './general-contacts/general-contacts/general-contacts.component';



@NgModule({
  declarations: [
    GeneralContactsComponent,
    LoadingModalComponent,
    GeneralPopComponent, GeneralListComponent, GeneralItemComponent, GeneralAuthComponent, GeneralBannerComponent],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  exports: [
    GeneralContactsComponent,

    LoadingModalComponent,

    GeneralPopComponent, GeneralListComponent, GeneralItemComponent, GeneralAuthComponent, GeneralBannerComponent]
})
export class CoreModule { }
