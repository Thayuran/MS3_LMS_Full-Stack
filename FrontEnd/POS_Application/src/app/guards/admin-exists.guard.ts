import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({ providedIn: 'root' })

export class adminExistsGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.adminExists$.pipe(
      map(exists => {
        if (!exists) {
          this.router.navigateByUrl('/auth/createAdmin');
        }
        return exists;
      })
    );
  }
};
