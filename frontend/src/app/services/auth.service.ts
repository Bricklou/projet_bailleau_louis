import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { FormResult } from '../types/form.dto';
import { tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User | undefined;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {}

  public get isAuthenticated() {
    return !!this.user;
  }

  public login(username: string, password: string) {
    return this.httpClient
      .post<User>('/api/auth', {
        username,
        password,
      })
      .pipe(
        tap((user) => {
          this.user = user;
        }),
      );
  }

  public register(data: FormResult) {
    return this.httpClient.post<User>('/api/auth/register', data).pipe(
      tap((user) => {
        this.user = user;
      }),
    );
  }

  public logout() {
    this.user = undefined;
    this.tokenService.clearToken();
  }
}
