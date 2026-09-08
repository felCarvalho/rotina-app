import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../account/services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const isAuthenticated = authService.verifySessionId();
  const router = inject(Router);

  return isAuthenticated ? isAuthenticated : router.createUrlTree(['/login']);
};
