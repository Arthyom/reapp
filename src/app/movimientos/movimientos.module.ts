import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovimientosPageRoutingModule } from './movimientos-routing.module';

import { MovimientosPage } from './movimientos.page';
import { CoreModule } from '../core/core-module.module';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MovimientosPageRoutingModule
  ],
  declarations: [MovimientosPage]
})
export class MovimientosPageModule { }
