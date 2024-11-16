import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../Services/invoice.service';
import { Router } from '@angular/router';
import { InvoicePageService } from '../../Services/invoice-page.service';
import { InvoiceFilter } from '../../Models/invoiceFilter';
import { Invoice } from '../../Models/invoice';
import { take } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { UserService } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {
  data$: Observable<any>;
  users$: Observable<any>;
  role: string

  constructor(
    private invoiceService: InvoiceService,
    private usersService: UserService,
    private auth: AuthService,
    private router: Router,
    private invoicePageService: InvoicePageService
  ) {

    this.data$ = this.invoiceService.all(1, 20);
    this.users$ = this.usersService.users$;
    this.role= this.auth.role ?? '';
  }



  ngOnInit(): void {
    if (this.role !== 'user') {
      this.usersService.loadUsers();
    }

  }

  handlePagination({ pageSize, pageIndex }: PageEvent): void {
    this.data$ = this.invoiceService.all(pageIndex + 1, pageSize);
  }

  handleFilter(filters: InvoiceFilter): void {
    this.data$ = this.invoiceService.all(1, 20, filters);
  }

  editInvoice(invoice: Invoice): void {
    this.invoiceService
      .getById(invoice.id)
      .pipe(take(1))
      .subscribe(invoiceDetails => {
        this.invoicePageService.editInvoice(invoiceDetails);
        this.router.navigateByUrl('/invoice/create');
      });
  }

  resetInvoice(): void {
    this.invoicePageService.reset();
  }
}
