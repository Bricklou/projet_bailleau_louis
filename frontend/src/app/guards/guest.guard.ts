import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  console.log(authService.isAuthenticated);

  return authService.isAuthenticated.pipe(map((isAuth) => !isAuth));
};
