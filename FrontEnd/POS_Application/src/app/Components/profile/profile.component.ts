import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../Models/user';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user$: Observable<User>;

  changePasswordForm: FormGroup;
  url: string | ArrayBuffer | null | undefined = '';

  editName = false;
  changePassword = false;

  hasPhotoUploaded = false;


  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(environment.apiUrl) private api: string
  ) {
    this.user$ = this.auth.profile$;
    this.uploadForm = this.fb.group({
      profile: [''],
    });


    this.changePasswordForm = this.fb.group(
      {
        oldPassword: ['', Validators.required],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }
  uploadForm: FormGroup




  // changePasswordForm = this.fb.group(
  //   {
  //     oldPassword: ['', Validators.required],
  //     newPassword: ['', Validators.required],
  //     confirmPassword: ['', Validators.required],
  //   },
  //   { validators: this.checkPasswords }
  // );



  submitName(name: string): void {
    this.editName = false;

    this.auth
      .changeName(name)
      .pipe(take(1))
      .subscribe(user => console.log(user));
  }

  submitChangePassword(): void {
    this.auth
      .changePassword(this.changePasswordForm.value)
      .pipe(take(1))
      .subscribe(
        user => {
          this.changePassword = false;
          this.openSnackBar(
            'Password was changed successfully!',
            'success-snackbar'
          );
        },
        error => {
          this.changePassword = true;
          if (typeof error.error.message === 'string') {
            this.openSnackBar(error.error.message, 'alert-snackbar');
          }
        }
      );
  }

  checkPasswords(group: FormGroup): null | { notSame: boolean } {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const password = group.get('newPassword')!.value;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const confirmPassword = group.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  onSelectFile(event: any): void {
    console.log(event);
    console.log(this.url);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.uploadForm?.get('profile')?.setValue(event.target.files[0]);

      reader.readAsDataURL(event.target.files[0]);
      reader.onload = e => {
        // called once readAsDataURL is completed
        this.url = e?.target?.result;
        this.hasPhotoUploaded = true;
        console.log(this.url);
      };
    }
  }

  delete(): void {
    this.url = null;
    this.uploadForm.get('profile')?.patchValue(null);
    this.hasPhotoUploaded = false;
  }

  save(): void {
    console.log(this.url);
    const formData = new FormData();
    formData.append('photo', this.uploadForm?.get('profile')?.value);
    this.auth.changeProfilePhoto(formData).subscribe(
      res => {
        if (res) {
          this.openSnackBar('Photo Changed Successfully', 'success-snackbar');
          this.hasPhotoUploaded = false;
        }
      },
      error => {
        this.openSnackBar(error.message, 'alert-snackbar');
      }
    );
  }

  imageSource(image: string | null): string | ArrayBuffer {
    if (this.url) {
      return this.url;
    } else if (image) {
      return this.api.substring(0, this.api.length - 3) + image;
    } else {
      return 'assets/user.png';
    }
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
