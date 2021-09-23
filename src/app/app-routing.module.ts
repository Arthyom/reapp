import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login-register',
    pathMatch: 'full'
  },
  {
    path: 'login-register',
    loadChildren: () => import('./login-register/login-register.module').then(m => m.LoginRegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home-dash/home-dash.module').then(m => m.HomeDashPageModule)
  },
  {
    path: 'transactions',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsPageModule)
  },
  {
    path: 'token',
    loadChildren: () => import('./token/token.module').then(m => m.TokenPageModule)
  },
  {
    path: 'passchange',
    loadChildren: () => import('./passchange/passchange.module').then(m => m.PasschangePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
