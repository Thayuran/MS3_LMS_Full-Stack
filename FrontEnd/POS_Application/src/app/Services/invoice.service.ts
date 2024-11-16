import { Inject, Injectable } from '@angular/core';
import { AllInvoicesRes, Invoice } from '../Models/invoice';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { InvoiceFilter } from '../Models/invoiceFilter';
import { AuthService } from '../Models/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export interface InvoiceState {
  filters: InvoiceFilter | null;
}

export const initialState: InvoiceState = {
  filters: null,
};


export class InvoiceService {
  private invoiceState = new BehaviorSubject<InvoiceState>(initialState);

  get state(): InvoiceState {
    return this.invoiceState.getValue();
  }

  constructor(
    @Inject(environment.apiUrl) private api: string,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  all(
    page: number,
    pageSize: number,
    filters?: Partial<InvoiceFilter>
  ): Observable<AllInvoicesRes> {
    let finalFilters: Partial<InvoiceFilter> = this.state.filters ?? {};

    if (filters) {
      finalFilters = filters;
    }

    if (this.auth.role === 'user') {
      finalFilters = { ...finalFilters, user: this.auth.state.userId! };
    }

    const params = createParamsFromObject(finalFilters)
      .append('page', page)
      .append('pageSize', pageSize);

    return this.http
      .get<AllInvoicesRes>(`${this.api}/invoices`, { params })
      .pipe(tap(x => console.log(x)));
  }

  getById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.api}/invoices/${id}`);
  }
}
