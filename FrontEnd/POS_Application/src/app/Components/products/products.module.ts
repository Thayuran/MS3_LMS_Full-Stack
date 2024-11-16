import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './crud/edit-product/edit-product.component';
import { AddProductComponent } from './crud/add-product/add-product.component';
import { ProductDetailsComponent } from './crud/product-details/product-details.component';
import { ProductFilterFormComponent } from './product-filter-form/product-filter-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductsComponent } from './crud/all-products/products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'details/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'add',
    component: AddProductComponent,
  },
  {
    path: 'edit/:id',
    component: EditProductComponent,
  },
];

@NgModule({
  declarations: [
    // ProductsComponent,
    // AddProductComponent,
    // ProductDetailsComponent,

    // // components
    // ProductTableComponent,
    // ProductFilterFormComponent,
    // EditProductComponent,
    // ProductFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ]
})
export class ProductsModule { }
