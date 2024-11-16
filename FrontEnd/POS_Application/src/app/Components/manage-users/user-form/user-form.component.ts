import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../Models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {


  @Input() user?: User;
  @Input() readonly = false;

  @Output() submitted = new EventEmitter<User>();

  hide = true;

  roles = [
    {
      label: 'Manager',
      value: 'manager',
    },
    {
      label: 'Economist',
      value: 'economist',
    },
    {
      label: 'User',
      value: 'user',
    },
  ];

  form:FormGroup;
  // shifts$ = this.shiftsService.all();


    // password: [ null, Validators.compose([
    //   Validators.required,
    //   patternValidator(/\d/, { hasNumber: true }),
    //   patternValidator(/[A-Z]/, { hasCapitalCase: true }),
    //   patternValidator(/[a-z]/, { hasSmallCase: true }),
    //   patternValidator(/[!-\/:-@[-`{-~]/, { hasSpecialCharacters: true }),
    //   Validators.minLength(8)
    // ]) ],


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      shift: [null, Validators.required],
      role: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue(this.user);

      this.form.get('shift')?.patchValue(this.user.user_shift?.shift_id);
    }
    if (this.readonly) {
      this.form.disable();
    }
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.value);
  }
}
