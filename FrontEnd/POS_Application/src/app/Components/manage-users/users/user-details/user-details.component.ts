import { Component } from '@angular/core';
import { UserService } from '../../../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../../Models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {


  user$: Observable<User>;

  constructor(private users: UserService, private route: ActivatedRoute) {
    this.user$ = this.users.one(this.route.snapshot.params['id']);
  }

}
