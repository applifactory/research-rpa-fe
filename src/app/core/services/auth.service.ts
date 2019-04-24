import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env';
import { AuthResponse } from '../models/auth-response';

import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { AlertService } from '@app/shared/alert/alert.service';
import { AlertType } from '@app/shared/alert/models/alert-type';

const AUTH_TOKEN_KEY: string = 'AuthToken';

@Injectable()
export class AuthService {

  public user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly alert: AlertService
  ) {}

  public getAuthToken(): string {
    return localStorage.getItem(AUTH_TOKEN_KEY)
  }

  public setAuthToken(token: string) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }

  public async login(email: string, password: string): Promise<User> {
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
      this.logout();
      throw new Error( e.error.message || e.statusText );
    }
    this.setAuthToken(response.accessToken);
    const user: User = await this.getCurrentUser();
    this.router.navigate(['']);
    return user;
  }

  public logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    this.user$.next(null);
    this.router.navigate(['login']);
  }

  public async isAuthorized(): Promise<boolean> {
    const user: User = await this.getCurrentUser();
    if ( !user ) {
      this.alert.add('Please log in to access this resource', AlertType.Warning);
    }
    return !!user;
  }

  public async getCurrentUser(): Promise<User> {
    let user: User;
    try {
      user = <User>await this.http.get(`${environment.apiUrl}/user`).toPromise();
    } catch (e) {
      this.logout();
      return null;
    }
    this.user$.next(user);
    return user;
  }

}
