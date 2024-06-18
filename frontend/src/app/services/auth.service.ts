import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { TokenService } from './token.service';
import { User } from 'app/types/models/user.model';
import { RegisterUserDto } from 'app/types/dto/register-user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly currentUser = new BehaviorSubject<User | undefined>(
    undefined,
  );

  public constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
  ) {}

  public login(email: string, password: string): Observable<User> {
    return this.httpClient.post<User>('/api/auth', { email, password }).pipe(
      map((data) => {
        this.currentUser.next(data);
        return data;
      }),
    );
  }

  public register(data: RegisterUserDto): Observable<User> {
    return this.httpClient.post<User>('/api/auth/register', data).pipe(
      map((data) => {
        this.currentUser.next(data);
        return data;
      }),
    );
  }

  public logout(): void {
    this.currentUser.next(undefined);
    this.tokenService.clearToken();
  }

  public get isAuthenticated(): Observable<boolean> {
    return this.currentUser.asObservable().pipe(map((user) => Boolean(user)));
  }

  public refresh() {
    return this.httpClient.post<User>('/api/auth/refresh', {});
  }
}
