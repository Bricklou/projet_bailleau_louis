import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessToken = new BehaviorSubject<string | undefined>(undefined);

  public clearToken() {
    this.accessToken.next(undefined);
  }
}
