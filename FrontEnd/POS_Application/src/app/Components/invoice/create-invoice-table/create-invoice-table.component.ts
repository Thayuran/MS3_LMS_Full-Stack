import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InvoiceProduct } from '../../../Services/invoice-page.service';

@Component({
  selector: 'app-create-invoice-table',
  templateUrl: './create-invoice-table.component.html',
  styleUrl: './create-invoice-table.component.css'
})
export class CreateInvoiceTableComponent {

  @Input() invoiceProducts: InvoiceProduct[] = [];

  @Output() removed = new EventEmitter<number>();

  @Output() increase = new EventEmitter<number>();
  @Output() decrease = new EventEmitter<number>();

  displayedColumns: string[] = ['name', 'price', 'count', 'total', 'remove'];

  allTotal(): number {
    let total = 0;

    this.invoiceProducts.forEach(item => {
      total += item.product.price * item.count;
    });

    return total;
  }
}
