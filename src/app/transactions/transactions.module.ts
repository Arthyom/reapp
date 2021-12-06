import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionsPageRoutingModule } from './transactions-routing.module';

import { TransactionsPage } from './transactions.page';
import { CoreModule } from '../core/core-module.module';
import { NgTippyModule } from 'angular-tippy';

@NgModule({
  imports: [
    NgTippyModule,
    CoreModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionsPageRoutingModule
  ],
  declarations: [TransactionsPage]
})
export class TransactionsPageModule { }
