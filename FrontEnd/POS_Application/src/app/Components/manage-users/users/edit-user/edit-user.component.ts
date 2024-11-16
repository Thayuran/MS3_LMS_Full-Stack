import { Component } from '@angular/core';
import { UserService } from '../../../../Services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../../../Models/user';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {


  userId!: number;
  user$!: Observable<User>;

  constructor(
    private users: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userId = this.route.snapshot.params['id'];
    this.user$ = this.users.one(this.userId);
  }

  handleEdit(data: User): void {
    this.users
      .update(this.userId, data)
      .pipe(take(1))
      .subscribe(
        value => {
          this.router.navigate(['/manage-users/details', this.userId]).then();
          this.snackBar.open('User edited successfully', 'close', {
            duration: 1000,
          });
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.openSnackBar(error.error.message, 'alert-snackbar');
            }
            if (typeof error.error.message === 'string') {
              this.openSnackBar(error.error.message, 'alert-snackbar');
            }
            // const unhandledErrors = handleServerSideValidation(error, this.form);
            // console.log(unhandledErrors, error);
            // if (unhandledErrors) {
            //   this.openSnackBar(error.statusText, 'error');
            // }
          }
        }
      );
  }

  openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass,
    });
  }
}
