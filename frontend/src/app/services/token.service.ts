import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessToken = new BehaviorSubject<string | undefined>(undefined);

  public getTokenFromResponse(response: HttpResponse<unknown>) {
    const authorization = response.headers.get('authorization');

    if (authorization) {
      const bearer = authorization.split(' ')[1];
      if (bearer) {
        this.accessToken.next(bearer);
      } else {
        this.accessToken.next(undefined);
      }
    }
  }

  public clearToken() {
    this.accessToken.next(undefined);
  }
}
