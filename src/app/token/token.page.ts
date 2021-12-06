import { Component, OnInit } from '@angular/core';
import { TokenServiceService } from './servicios/tokenService/token-service.service';
import { GeneralPaths } from '../core/enums/general-paths';
import { GeneralResponse } from '../core/models/responses/generalResponse';
import { LoginService } from '../login-register/services/login.service';
import { UsuarioResponse } from '../core/models/responses/usuarioResponse';

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {


  response: GeneralResponse;

  isLogged = this.tokenService.isLoged;

  constructor(
    private tokenService: TokenServiceService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    if (this.isLogged) {
      this.createToken();
    }
  }

  async createToken() {
    this.response = await this.tokenService.post<GeneralResponse>(this.tokenService.configsBase,
      GeneralPaths.generaToken, false).toPromise();
  }



  async login(usrRqts) {
    const usrRsps = await this.loginService.post<UsuarioResponse>(usrRqts, GeneralPaths.login).toPromise();
    if (this.loginService.authUser(usrRsps, usrRqts)) {
      this.createToken();
      this.isLogged = true;
    }
  }


}
