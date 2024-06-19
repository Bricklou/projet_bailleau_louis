import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated.pipe(
    switchMap(async (value) => {
      if (value) return true;

      return router.navigate(['/auth/login'], {
        queryParams: {
          returnUrl: state.url,
        },
      });
    }),
    catchError((error: Error) => {
      return throwError(() => error);
    }),
  );
};
