import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessToken = new BehaviorSubject<string | undefined>(undefined);
  private refreshToken = new BehaviorSubject<string | undefined>(undefined);

  public constructor(private tokenStorage: TokenStorageService) {
    const refreshToken = tokenStorage.load();
    if (refreshToken) this.refreshToken.next(refreshToken);
  }

  public clearToken() {
    this.accessToken.next(undefined);
    this.tokenStorage.deleteTokens();
  }
}
