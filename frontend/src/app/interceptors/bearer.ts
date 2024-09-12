import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionsService } from '../services/session.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const bearerInterceptor: HttpInterceptorFn = (
  request: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const session = inject(SessionsService)
  const router = inject(Router)

  const decoded = session.getSession()

  console.log(decoded)

  // console.log(decoded?.access_token)

  request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${decoded?.access_token}`
    }
  })

  return next(request)
  .pipe(catchError((error) => {
    if (error.status === 401) {
      console.log('ERROR!!!')

      session.signOut()
      router.navigateByUrl('login')
    }

    return throwError(() => error)
  }));
};
