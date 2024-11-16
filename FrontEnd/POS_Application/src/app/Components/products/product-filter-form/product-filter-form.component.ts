import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsFilter } from '../../../Models/product-filter';
import { Category } from '../../../Models/Category';
import { Product } from '../../../Models/Products';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-filter-form',
  templateUrl: './product-filter-form.component.html',
  styleUrl: './product-filter-form.component.css'
})
export class ProductFilterFormComponent implements OnInit {
form:FormGroup;


  @Input() filters: ProductsFilter | null = null;

  @Input() categories: Category[] = [];

  @Output() filtered = new EventEmitter<Product>();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: '',
      barcode: '',
      hasLowStock: '',
      categoryId: '',
    });

    this.form = this.fb.group({
      name: '',
      barcode: '',
      hasLowStock: '',
      categoryId: '',
    });


  }

  ngOnInit(): void {
    if (this.filters) {
      this.form.patchValue(this.filters);
    }
  }

  onSubmit(): void {
    this.filtered.emit(this.form.value);
  }
}
