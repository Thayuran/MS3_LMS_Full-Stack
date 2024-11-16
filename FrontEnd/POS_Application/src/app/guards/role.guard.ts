import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LayoutService } from '../Services/layout.service';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

export class roleGuard implements CanActivate{
  constructor(
    private auth: AuthService,
    private router: Router,
    private layoutService: LayoutService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
    // let response = false;
    // this.layoutService.navItems.map(navItem => {
    //   if (navItem.path === route.url[0].path) {
    //     if (navItem.roles.includes(this.auth.getLocalState().role as string)) {
    //       response = true;
    //       return;
    //     } else {
    //       return;
    //     }
    //   }
    // });
    // return response;
  }
};
