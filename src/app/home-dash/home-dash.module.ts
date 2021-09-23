import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDashPageRoutingModule } from './home-dash-routing.module';

import { HomeDashPage } from './home-dash.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDashPageRoutingModule
  ],
  declarations: [HomeDashPage]
})
export class HomeDashPageModule {}
