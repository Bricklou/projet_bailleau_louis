import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

export const apiHttpInterceptor: HttpInterceptorFn = (request, next) => {
  const tokenService = inject(TokenService);

  request = tokenService.updateRequest(request);

  return next(request)
    .pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          tokenService.getTokenFromResponse(event);
        }
      }),
    )
    .pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            tokenService.clearToken();
            break;
        }
        return throwError(() => error);
      }),
    );
};
