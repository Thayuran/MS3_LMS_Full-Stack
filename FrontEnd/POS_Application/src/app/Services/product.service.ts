import { Inject, Injectable } from '@angular/core';
import { Product, ProductDetails, SaveProductPayload } from '../Models/Products';
import { BehaviorSubject, catchError, distinctUntilChanged, Observable, of, tap } from 'rxjs';
import { Pagination } from '../Models/Pagination';
import { ProductsFilter } from '../Models/product-filter';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { createParamsFromObject } from './create-params-from-object';

export interface ProductsState {
  data: Product[];
  pagination: Pagination;
  filters: ProductsFilter | null;
  error: string | null;
  loading: boolean;
  loaded: boolean;
}

const initialState: ProductsState = {
  data: [],
  pagination: { pageSize: 10, pageIndex: 0, total: 0 },
  filters: null,
  error: null,
  loading: false,
  loaded: false,
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private readonly state = new BehaviorSubject<ProductsState>(initialState);
  readonly state$ = this.state.asObservable().pipe(distinctUntilChanged());

  get currentState(): ProductsState {
    return this.state.getValue();
  }

  constructor(private http: HttpClient, @Inject(environment.apiUrl) private api: string) {}

  getProducts(
    filters: Partial<ProductsFilter> = {},
    pagination: Pagination
  ): Observable<any> {
    const path = `${this.api}/products`;
    const params = createParamsFromObject(filters)
      .append('page', pagination.pageIndex + '')
      .append('pageSize', pagination.pageSize + '');

    return this.http.get<any>(path, { params });
  }

  private setData(data: Product[], pagination: Pagination): void {
    this.state.next({
      ...this.currentState,
      data,
      pagination,
      loading: false,
      loaded: true,
      error: null,
    });
  }

  private setError(error: string): void {
    this.state.next({
      ...this.currentState,
      error,
      loading: false,
      loaded: true,
      data: [],
    });
  }

  loadProducts(
    filters?: ProductsFilter,
    pagination?: Partial<Pagination>
  ): Observable<any> {
    const currentPagination = this.currentState.pagination;
    const newPagination = pagination
      ? { ...currentPagination, ...pagination }
      : currentPagination;
    const newFilters = filters ?? this.currentState.filters;

    this.state.next({
      ...this.currentState,
      filters: newFilters,
      pagination: newPagination,
      loading: true,
      error: null,
      loaded: false,
    });
    // const {pageSize, pageIndex} = this.currentState.pagination;

    return this.getProducts(
      this.currentState.filters ?? {},
      this.currentState.pagination
    ).pipe(
      tap(res => {
        const samplePagination: Pagination = {
          pageSize: +res.per_page,
          pageIndex: res.current_page,
          total: res.total,
        };

        return this.setData(res.data, samplePagination);
      }),
      catchError(error => {
        this.setError('An error has occurred. Please try again later!');
        return of(error);
      })
    );
  }

  getById(id: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(`${this.api}/products/${id}`);
  }

  filterProducts(
    query?: string,
    category?: number
  ): Observable<ProductsFilter> {
    let params = new HttpParams();

    if (query) {
      params = params.append('searchQuery', query);
    }
    if (category) {
      params = params.append('category', category);
    }

    return this.http.get<ProductsFilter>(`${this.api}/products/filter`, {
      params,
    });
  }

  createProduct(payload: SaveProductPayload): Observable<Product> {
    const path = `${this.api}/products`;
    return this.http.post<Product>(path, payload);
  }

  updateProduct(id: number, payload: SaveProductPayload): Observable<Product> {
    const path = `${this.api}/products/${id}`;
    return this.http.patch<Product>(path, payload);
  }
}
