import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DashboardResponse } from '../../Models/DashboardResponse';
import { DashboardService } from '../../Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  data: Partial<DashboardResponse> = {
    sales: undefined,
    invoiceCount: undefined,
    productSales: undefined,
    salesByCategory: undefined,
    lowStockProducts: undefined,
  };

  loading = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getDashboardStats();
  }

  getDashboardStats(): void {
    this.loading = true;
    this.dashboardService.data$.pipe(take(1)).subscribe(res => {
      this.data = res;
      this.loading = false;
    });
  }

}
