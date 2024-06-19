import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { TokenService } from 'app/services/token.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);

  req = tokenService.updateRequest(req);

  return next(req).pipe(
    catchError((error: Error) => {
      // Is this an http error
      if (!(error instanceof HttpErrorResponse)) {
        return throwError(() => error);
      }

      // Skip if not an "unauthorized" error
      if (
        error.status !== 401 ||
        (req.url === '/api/auth' && req.method === 'POST')
      ) {
        return throwError(() => error);
      }

      // If it is a 401 but come from a refresh request, logout the user and skip it
      /*if (req.url === '/api/auth/refresh') {
        authService.clearUser();
        return throwError(() => error);
      }

      // Finally, try to refresh the user
      return authService.refresh().pipe(switchMap(() => next(req)));*/
      return throwError(() => error);
    }),
  );
};
