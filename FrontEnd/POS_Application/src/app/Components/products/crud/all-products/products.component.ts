import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Services/product.service';
import { CategoryService } from '../../../../Services/category.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {


  vm$: Observable<any>;
  categories$: Observable<any>;



  dataSource: any;
  pagination: any;

  load = new BehaviorSubject<any>(undefined);

  racing$ = this.load.asObservable().pipe(
    switchMap((value: any) => {
      // debugger;
      if (value) {
        if (value?.pageSize) {
          // pagination
          return this.productsService.loadProducts(undefined, value);
        } else {
          // filters
          return this.productsService.loadProducts(value);
        }
      } else {
        // initial load
        return this.productsService.loadProducts();
      }
    })
  );

  constructor(
    private productsService: ProductService,
    private categoryService: CategoryService
  ) {
    this.vm$ = this.productsService.state$;
    this.categories$ = this.categoryService.all();
  }

  ngOnInit(): void {
    this.vm$.subscribe(console.log);
  }

  onClickedRow(row: any): void {
    console.log(row);
  }
}
