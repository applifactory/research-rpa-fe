import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { AuthResponse } from '../models/auth-response';

import { map } from 'rxjs/operators';

const AUTH_TOKEN_KEY: string = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  public getAuthToken(): string {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  public setAuthToken(token: string) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  public async login(email: string, password: string): Promise<boolean> {
    let response: AuthResponse;
    try {
      response = await this.http.post(
        `${environment.apiUrl}/auth`, 
        {
          email, 
          password
        }
      ).pipe(
        map( (response) => <AuthResponse>response ),
      ).toPromise();
    } catch (e) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      throw new Error('Login error');
    }
    if ( !response ) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      throw new Error('Login error');
    }
    this.setAuthToken(response.accessToken);
    return true;
  }

}
