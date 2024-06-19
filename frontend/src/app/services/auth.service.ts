import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  connectable,
  map,
  of,
  share,
  switchMap,
  tap,
} from 'rxjs';
import { TokenService } from './token.service';
import { User } from 'app/types/models/user.model';
import { RegisterUserDto } from 'app/types/dto/register-user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly currentUser = new BehaviorSubject<User | null | undefined>(
    undefined,
  );

  public constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {}

  public login(email: string, password: string): Observable<User> {
    return this.httpClient
      .post<{ user: User; access: string }>('/api/auth', { email, password })
      .pipe(
        map((data) => {
          this.currentUser.next(data.user);
          this.tokenService.setToken(data.access);
          return data.user;
        }),
      );
  }

  public register(data: RegisterUserDto): Observable<User> {
    return this.httpClient
      .post<{ user: User; access: string }>('/api/auth/register', data)
      .pipe(
        map((data) => {
          this.currentUser.next(data.user);
          this.tokenService.setToken(data.access);
          return data.user;
        }),
      );
  }

  public logout(): Observable<void> {
    return this.httpClient.delete('/api/auth').pipe(
      map(() => {
        this.clearUser();
      }),
    );
  }

  public clearUser(): void {
    this.currentUser.next(null);
    this.tokenService.clearToken();
  }

  public get isAuthenticated(): Observable<boolean> {
    return this.currentUser.pipe(
      switchMap((user) => {
        if (user !== undefined) return of(user);

        return this.fetchUser().pipe(catchError(() => of(null)));
      }),
      map((user) => Boolean(user)),
    );
  }

  public refresh(): Observable<void> {
    return this.httpClient
      .post<{ access: string }>('/api/auth/refresh', {})
      .pipe(
        share(),
        switchMap((data) => {
          this.tokenService.setToken(data.access);
          return of();
        }),
      );
  }

  public fetchUser(): Observable<User> {
    return this.httpClient.get<User>('/api/auth').pipe(
      map((data) => {
        this.currentUser.next(data);
        return data;
      }),
    );
  }
}
