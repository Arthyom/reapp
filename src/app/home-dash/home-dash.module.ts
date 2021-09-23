import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDashPageRoutingModule } from './home-dash-routing.module';

import { HomeDashPage } from './home-dash.page';
import { MenubarComponent } from './menubar/menubar/menubar.component';
import { CoreModule } from '../core/core-module.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CoreModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDashPageRoutingModule
  ],
  declarations: [HomeDashPage, MenubarComponent]
})
export class HomeDashPageModule { }
