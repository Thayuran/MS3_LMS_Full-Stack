import { Category } from './../../../Models/Category';
import { Component } from '@angular/core';
import { ProductDetails } from '../../../Models/Products';
import { CategoryService } from '../../../Services/category.service';
import { ProductService } from '../../../Services/product.service';
import { Observable } from 'rxjs';
import { InvoicePageService, InvoiceProduct } from '../../../Services/invoice-page.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent {
  categories$:Observable<any>;
  products$:Observable<any>;
  vm$: Observable<any>;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private invoicePageService: InvoicePageService
  ) {
    this.categories$ = this.categoryService.all();
    this.products$ = this.productService.filterProducts();

    this.vm$ = this.invoicePageService.state$;}

  handleProductSearch(event: any): void {
    const query = event.target.value;
    console.log(query);
    this.products$ = this.productService.filterProducts(query);
  }

  setActiveCategory(categoryId: number): void {
    this.invoicePageService.setActiveCategory(categoryId);
    this.products$ = this.productService.filterProducts(undefined, categoryId);
  }

  addItem(product: ProductDetails, invoiceProducts: InvoiceProduct[]): void {
    const item = invoiceProducts.find(x => x.product.id === product.id);
    if (item) {
      if (item.product.stock.quantity <= item.count) {
        return;
      }
    }
    if (product.stock.quantity > 0) {
      this.invoicePageService.addInvoiceProduct(product);
    }
  }

  removeItem(productId: number): void {
    this.invoicePageService.removeInvoiceProduct(productId);
  }

  increaseItemQuantity(productId: number): void {
    this.invoicePageService.changeProductQuantity(productId, 'plus');
  }

  decreaseItemQuantity(productId: number): void {
    this.invoicePageService.changeProductQuantity(productId, 'minus');
  }

  createInvoice(): void {
    this.invoicePageService.createInvoice();
    this.invoicePageService.reset();
  }

  updateInvoice(): void {
    this.invoicePageService.updateInvoice();
    this.invoicePageService.reset();
  }

  payInvoice(): void {
    this.invoicePageService.payInvoice();
  }

  printInvoice(): void {
    window.print();
  }
}
