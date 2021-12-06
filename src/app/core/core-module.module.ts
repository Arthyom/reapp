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
import { LoadingModalComponent } from './loading-modal/loading-modal/loading-modal.component';
import { GeneralContactsComponent } from './general-contacts/general-contacts/general-contacts.component';
import { GeneralTokenComponent } from './general-token/general-token/general-token.component';
import { GeneralTransStepsComponent } from './general-trans-steps/general-trans-steps/general-trans-steps.component';
import { LongPressModule } from 'ionic-long-press';

import { Device } from '@ionic-native/device/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { AppGeneralEmptyComponent } from './app-general-empty/app-general-empty.component';



@NgModule({
  declarations: [
    AppGeneralEmptyComponent,
    GeneralTransStepsComponent,
    GeneralTokenComponent,
    GeneralContactsComponent,
    LoadingModalComponent,
    GeneralPopComponent, GeneralListComponent, GeneralItemComponent, GeneralAuthComponent, GeneralBannerComponent],
  imports: [
    LongPressModule,
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  providers:[Device, Clipboard],
  exports: [
    AppGeneralEmptyComponent,
    GeneralTransStepsComponent,

    GeneralTokenComponent,
    GeneralContactsComponent,

    LoadingModalComponent,

    GeneralPopComponent, GeneralListComponent, GeneralItemComponent, GeneralAuthComponent, GeneralBannerComponent]
})
export class CoreModule { }
