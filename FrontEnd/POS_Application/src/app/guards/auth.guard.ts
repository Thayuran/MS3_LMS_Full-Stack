import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { map, Observable, pluck } from 'rxjs';
import { AuthService } from '../Services/auth.service';

export class authGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.auth$.pipe(
      pluck('access_token'),
      map(token => {
        if (token) {
          return true;
        }
        this.router.navigate(['auth/login']).then();
        return false;
      })
    );
  }
};
