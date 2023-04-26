import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../model/jwt-dto.model';
import { NuevoUsuario } from '../model/new-user.model';
import { LoginUsuario } from '../model/login-user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  public new(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authUrl + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authUrl + '/auth/login', loginUsuario);
  }
}
