import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.isAuthenticated.pipe(map((isAuth) => !isAuth));
};
