import { CanActivate, CanActivateFn, Router } from '@angular/router';
import {Observable} from 'rxjs';
import { map, pluck, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';


@Injectable({
  providedIn: 'root',
})

export class nonAuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.auth$.pipe(
      pluck('access_token'),
      map(token => {
        if (!token) {
          return true;
        }
        this.router.navigateByUrl('/products');
        return false;
      })
    );
  }
};
