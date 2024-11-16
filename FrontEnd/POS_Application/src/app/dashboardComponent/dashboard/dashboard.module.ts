import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BarChartModule, PieChartModule } from '@swimlane/ngx-charts';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ItemsChartComponent } from '../items-chart/items-chart.component';
import { CategoriesChartComponent } from '../categories-chart/categories-chart.component';
import { BelowStockProductsTableComponent } from '../below-stock-products-table/below-stock-products-table.component';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [DashboardComponent,ItemsChartComponent,CategoriesChartComponent,BelowStockProductsTableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    BarChartModule,
    MatProgressSpinnerModule,
    PieChartModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class DashboardModule { }
