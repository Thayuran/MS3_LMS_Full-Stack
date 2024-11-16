import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../../Models/Category';
import { ProductDetails, SaveProductPayload } from '../../../Models/Products';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit {

  @Input() product?: ProductDetails;

  @Input() categories: Category[] = [];

  @Input() readonly = false;

  @Output() submitted = new EventEmitter<SaveProductPayload>();

form:FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      barcode: ['', Validators.required],
      low_stock: ['', Validators.required],
      optimal_stock: ['', Validators.required],
      stock_type: ['', Validators.required],
      category_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.form.patchValue(this.product);
      this.form.get('stock_type')?.patchValue(this.product.stock.type);
    }
    if (this.readonly) {
      this.form.disable();
    }
  }

  handleSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.form.value);
  }
}
