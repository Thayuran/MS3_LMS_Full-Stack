import { Pipe, PipeTransform } from '@angular/core';
import { ProductDetails } from '../../../Models/Products';
import { InvoiceProduct } from '../../../Services/invoice-page.service';

@Pipe({
  name: 'currentStockQuantity'
})
export class CurrentStockQuantityPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(
    product: ProductDetails,
    invoiceProducts: InvoiceProduct[]
  ): number {
    const invoiceProduct = invoiceProducts.find(
      x => x.product.id === product.id
    );
    if (invoiceProduct) {
      return product.stock.quantity - invoiceProduct.count;
    }
    return product.stock.quantity;
  }
}
