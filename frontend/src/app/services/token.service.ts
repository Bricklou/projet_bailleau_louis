import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private accessToken: string | undefined = undefined;

  public getTokenFromResponse(response: HttpResponse<unknown>) {
    const authorization = response.headers.get('authorization');

    if (authorization) {
      const bearer = authorization.split(' ')[1];
      if (bearer) {
        this.accessToken = bearer;
      } else {
        this.accessToken = undefined;
      }
    }
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
