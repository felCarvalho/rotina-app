import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, switchMap } from 'rxjs';
import { AuthService } from '../account/services/auth.service';
import { LocalStorageUtil } from '../utils/local-storage/local.storage';

export function refreshTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isStopLoop = req.url.includes('/login') || req.url.includes('/refresh');

  return next(req).pipe(
    catchError((error: any) => {
      if (error.status !== 401 || isStopLoop) {
        return throwError(() => error);
      }

      return authService.postRefreshToken().pipe(
        switchMap(() => {
          return next(req);
        }),
        catchError((error: any) => {
          LocalStorageUtil.removeItem('sessionId');
          router.navigate(['/login']);
          console.log('refresh token error', error);
          return throwError(() => error);
        }),
      );
    }),
  );
}
