import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../Services/product.service';
import { CategoryService } from '../../../../Services/category.service';
import { SaveProductPayload } from '../../../../Models/Products';
import { switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

  categories$: Observable<any>;
  product$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categories$ = this.categoryService.all();
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => this.productService.getById(params.get('id')!))
    );
  }

  handleEdit(id: number, product: SaveProductPayload): void {
    this.productService
      .updateProduct(id, product)
      .pipe(take(1))
      .subscribe(res => this.router.navigate(['/products/details', res.id]));
  }
}
