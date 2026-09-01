import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, switchMap } from 'rxjs';
import { AuthService } from "../account/services/auth.service";

export function refreshTokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const authService = inject(AuthService)
  const router = inject(Router)

  return next(req).pipe(
    catchError((error: any) => {
      if (error.status !== 401) {
        return throwError(() => error)
      }
      
      return authService.postRefreshToken().pipe(
        switchMap(() => {
         return next(req);
        }),
        catchError((error: any) => {
          router.navigate(['/login'])
          return throwError(() => error);
        })
      )
    })
  )
}
