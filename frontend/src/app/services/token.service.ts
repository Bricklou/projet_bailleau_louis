import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessToken: string | undefined = undefined;

  public setToken(token: string) {
    this.accessToken = token;
  }

  public updateRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    if (this.accessToken) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${this.accessToken}` },
      });
    }

    return request;
  }

  public clearToken() {
    this.accessToken = undefined;
  }
}
