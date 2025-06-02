import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take, switchMap } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica primeiro se está logado, depois se é admin
  return authService.isLoggedIn().pipe(
    take(1),
    map(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    }),
    // Aqui pode usar switchMap para verificar admin status
    // mas para simplificar, use um operador dentro do mesmo pipe:
    // como só o valor admin importa se está logado, use um mergeMap/switchMap
  ).pipe(
    switchMap(() => authService.isAdmin().pipe(
      take(1),
      map(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          router.navigate(['/']);
          return false;
        }
      })
    ))
  );
};
