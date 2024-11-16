import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../Services/product.service';
import { CategoryService } from '../../../../Services/category.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product$: Observable<any>;
  categories$:Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {
    this.categories$ = this.categoryService.all();

    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.productService.getById(params.get('id')!);
      })
    );
  }
}
