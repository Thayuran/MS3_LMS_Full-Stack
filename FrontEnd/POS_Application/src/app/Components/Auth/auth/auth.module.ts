import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthLayoutComponent } from '../auth-layout/auth-layout.component';
import { LoginComponent } from '../login/login.component';
import { CreateAdminComponent } from '../create-admin/create-admin.component';
import { adminExistsGuard } from '../../../guards/admin-exists.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        canActivate: [adminExistsGuard],
        component: LoginComponent,
      },
      {
        path: 'createAdmin',
        component: CreateAdminComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [AuthLayoutComponent, LoginComponent, CreateAdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ]
})
export class AuthModule { }
