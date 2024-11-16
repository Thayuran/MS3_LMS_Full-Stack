import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LowStockProduct } from '../../Models/DashboardResponse';

@Component({
  selector: 'app-below-stock-products-table',
  templateUrl: './below-stock-products-table.component.html',
  styleUrl: './below-stock-products-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BelowStockProductsTableComponent {

  @Input() dataSource: LowStockProduct[] = [];

  displayedColumns = ['name', 'minimumStock', 'stock', 'button'];

  getColor(stock: number, minimumStock: number): string {
    const limit = minimumStock * 0.2;
    if (minimumStock - stock <= limit) {
      return '#F7C600';
    } else {
      return 'red';
    }
  }
}
