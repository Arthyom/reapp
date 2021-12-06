import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login-register/login-register.module').then(m => m.LoginRegisterPageModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'home',
    loadChildren: () => import('./home-dash/home-dash.module').then(m => m.HomeDashPageModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'transactions/:type',
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsPageModule)
  },
  {
    path: 'token',
    loadChildren: () => import('./token/token.module').then(m => m.TokenPageModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'passchange',
    loadChildren: () => import('./passchange/passchange.module').then(m => m.PasschangePageModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'myprofile',
    loadChildren: () => import('./my-profile/my-profile.module').then(m => m.MyProfilePageModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsPageModule)
  },
  {
    canActivate: [AuthGuard],
    path: 'movimientos',
    loadChildren: () => import('./movimientos/movimientos.module').then(m => m.MovimientosPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
