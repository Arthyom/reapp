import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TokenPageRoutingModule } from './token-routing.module';

import { TokenPage } from './token.page';
import { CoreModule } from '../core/core-module.module';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TokenPageRoutingModule
  ],
  declarations: [TokenPage]
})
export class TokenPageModule { }
