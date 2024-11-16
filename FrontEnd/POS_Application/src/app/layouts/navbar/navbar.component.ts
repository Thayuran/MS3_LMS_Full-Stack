import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutService } from '../../Services/layout.service';
import { filter, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  navItems:any;
  name$:Observable<string>;

  constructor(private layoutservice:LayoutService,public auth:AuthService)
  {
    this.navItems = this.layoutservice.navItems;
    //this.name$=this.auth.auth$.pipe(pluck('name'));
    this.name$=this.auth.auth$.pipe(pluck('name'),filter((name): name is string => name !== null));
  }


}
