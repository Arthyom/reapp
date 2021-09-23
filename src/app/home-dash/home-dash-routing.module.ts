import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDashPage } from './home-dash.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDashPageRoutingModule {}
