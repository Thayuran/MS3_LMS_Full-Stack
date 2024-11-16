import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryFormData } from '../categorydata';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})
export class CategoryFormComponent implements OnInit{

form:FormGroup;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CategoryFormData,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.type === 'edit' && this.data.category) {
      this.form.patchValue(this.data.category);
    }
  }
}
