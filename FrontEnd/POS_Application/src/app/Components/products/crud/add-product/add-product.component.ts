import { Component } from '@angular/core';
import { CategoryService } from '../../../../Services/category.service';
import { ProductService } from '../../../../Services/product.service';
import { Router } from '@angular/router';
import { SaveProductPayload } from '../../../../Models/Products';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  categories$: Observable<any>;

  constructor(
    private router: Router,
    private productsService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categories$ = this.categoryService.all();
  }

  handleAdd(product: SaveProductPayload): void {
    this.productsService
      .createProduct(product)
      .pipe(take(1))
      .subscribe(res => this.router.navigate(['/products/details', res.id]));
  }
}
