import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionsService } from '../shared/services/session.service';

export const authGuard: CanActivateFn = (router, state) => {
    const session = inject(SessionsService);
    const angularRouter = inject(Router);

    if (!session.getSession()) {
      angularRouter.navigateByUrl('/login');
      return false;
    }

    return true;
};

export const guestGuard: CanActivateFn = (router, state) => {
    const session = inject(SessionsService);
    const angularRouter = inject(Router);

    if (session.getSession()) {
      angularRouter.navigateByUrl('/user');
      return false;
    }

    return true;
};
