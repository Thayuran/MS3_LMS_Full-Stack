import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceFormatComponent } from './invoice-format/invoice-format.component';
import { InvoiceFilterComponent } from './invoice-filter/invoice-filter.component';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';
import { CreateInvoiceTableComponent } from './create-invoice-table/create-invoice-table.component';
import { CurrentStockQuantityPipe } from './create-invoice/current-stock-quantity.pipe';

const routes: Routes = [
  { path: '', component: InvoiceComponent },
  { path: 'create', component: CreateInvoiceComponent },
];

@NgModule({
  declarations: [
    InvoiceComponent,
    CreateInvoiceComponent,
    InvoiceTableComponent,
    InvoiceFilterComponent,
    CreateInvoiceTableComponent,
    CurrentStockQuantityPipe,
    InvoiceFormatComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    // NgxBarcodeModule,
    // QrCodeModule,
  ],
  exports: [RouterModule],
})
export class InvoiceModule { }
