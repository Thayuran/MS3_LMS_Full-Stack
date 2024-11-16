import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ManageUsersComponent } from './manage-users.component';
import { ConfirmationDialogModule } from './confirmation-dialog/confirmation-dialog.module';
import { UserTableComponent } from './user-table/user-table.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';



const routes: Routes = [
  {
    path: '',
    component: ManageUsersComponent,
    data: { animation: 'ManageUsers' },
  },
  {
    path: 'add',
    component: AddUserComponent,
    data: { animation: 'Add' },
  },
  {
    path: 'edit/:id',
    component: EditUserComponent,
    data: { animation: 'Edit' },
  },
  {
    path: 'details/:id',
    component: UserDetailsComponent,
    data: { animation: 'Details' },
  },
];

@NgModule({
  declarations: [
    ManageUsersComponent,
    UserTableComponent,
    AddUserComponent,
    EditUserComponent,
    UserDetailsComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    ConfirmationDialogModule,
    MatCardModule,
  ]
})
export class ManageUserModule { }
