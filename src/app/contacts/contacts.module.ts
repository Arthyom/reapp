import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { CoreModule } from '../core/core-module.module';

@NgModule({
  imports: [
    CoreModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsPageRoutingModule
  ],
  declarations: [ContactsPage]
})
export class ContactsPageModule {}
