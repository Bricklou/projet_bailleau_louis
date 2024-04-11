import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private jwtToken: string | undefined;

  public updateRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    if (this.jwtToken) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${this.jwtToken}` },
      });
    }

    return request;
  }

  public getTokenFromResponse(response: HttpResponse<unknown>) {
    const authorization = response.headers.get('authorization');

    if (authorization) {
      const bearer = authorization.split(' ')[1];
      if (bearer) {
        this.jwtToken = bearer;
      } else {
        this.jwtToken = undefined;
      }
    }
  }

  public clearToken() {
    this.jwtToken = undefined;
  }
}
