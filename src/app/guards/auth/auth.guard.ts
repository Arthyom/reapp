import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigsService } from '../../core/services/common/configs/configs.service';
import { LoginService } from '../../login-register/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private loginService: LoginService
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if( !this.loginService.isLoged ){
         this.loginService.guiService.navigateTo('/login');
         return false;
      }
      return true;
  }

}
