import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  public load(): string | null {
    return localStorage.getItem('token');
  }

  public store(token: string) {
    localStorage.setItem('token', token);
  }

  public deleteTokens() {
    localStorage.removeItem('token');
  }
}
