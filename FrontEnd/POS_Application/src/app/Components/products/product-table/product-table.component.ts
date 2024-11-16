import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../../Models/Pagination';
import { Product } from '../../../Models/Products';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {
  @Input() dataSource: Product[] = [];

  @Input() pagination: Pagination = { pageIndex: 0, pageSize: 20, total: 0 };

  @Output() paginated = new EventEmitter<PageEvent>();

  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'stock',
    'stock_type',
    'barcode',
    'lowStock',
    'optimalStock',
    'actions',
  ];
}
