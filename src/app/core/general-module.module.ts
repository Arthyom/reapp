import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralListComponent } from './general-list/general-list/general-list.component';
import { GeneralItemComponent } from './general-item/general-item/general-item.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [GeneralListComponent, GeneralItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [GeneralListComponent, GeneralItemComponent]
})
export class GeneralModule { }
